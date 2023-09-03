import React, { useContext, useEffect, useReducer, useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Questionarrie, Teacher } from "../types/types";
import axios from "axios";
import "../styles/student/Portal.css";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

import { Button } from "@mui/material";

const Portal = () => {
  let { student } = useContext(AuthContext);

  type state = {
    session: { _id: string; Name: string; isValid: true | false };
    teacher: { _id: string; NAME: string };
    vote: {
      q0: number;
      q1: number;
      q2: number;
      q3: number;
      q4: number;
      q5: number;
      q6: number;
      q7: number;
    };
  };
  type action = {
    type: "SELECT TEACHER" | "SELECT SESSION" | "SAVE VOTE";
    payload: any;
  };
  let initial: state = {
    session: { _id: "", Name: "", isValid: false },
    teacher: { _id: "", NAME: "" },
    vote: {
      q0: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
    },
  };
  function reducer(state: state, action: action): state {
    switch (action.type) {
      case "SELECT TEACHER":
        return {
          ...state,
          teacher: { _id: action.payload._id, NAME: action.payload.NAME },
        };
      case "SELECT SESSION":
        return {
          ...state,
          session: {
            _id: action.payload._id,
            isValid: action.payload.isValid,
            Name: action.payload.Name,
          },
        };
      case "SAVE VOTE":
        return {
          ...state,
          vote: {
            ...state.vote,
            [action.payload.question]: Number(action.payload.value),
          },
        };
    }
  }
  let [Currstate, dispatch] = useReducer(reducer, initial);

  const [Teacher, setTeacher] = useState<[Teacher]>();
  const [question, setQuestions] = useState<Questionarrie>();
  let fetchfn = async () => {
    let temp = await axios.get(
      ` http://localhost:5000/api/getsessions?isActive=true`,
      {
        withCredentials: true, //most and most important thing
      }
    );
    console.log(temp?.data?.session[0]);
    let temp2 = await axios.get(`http://localhost:5000/api/teachers`, {
      withCredentials: true,
    });

    let questionResponse = await axios.get(
      "http://localhost:5000/api/getquestions",
      {
        withCredentials: true,
      }
    );
    setQuestions(questionResponse.data.questions[0]);
    setTeacher(temp2.data.teachers);
    dispatch({
      type: "SELECT SESSION",
      payload: {
        ...temp?.data?.session[0],
        isValid: temp?.data?.session[0].isActive,
      },
    });
  };
  console.log(Currstate?.session);
  useEffect(() => {
    fetchfn();
  }, []);
  let Formhandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(Currstate.vote).includes(0)) {
      toast.error("Please Vote in All the Fields", {
        style: { color: "black" },
      });
      return;
    }
    let votefn = async () => {
      try {
        let transfer = await axios.post(
          "http://localhost:5000/api/vote",
          {
            T_Id: Currstate.teacher._id,
            Session_id: Currstate.session.Name,
            ...Currstate.vote,
          },
          {
            withCredentials: true,
          }
        );

        transfer?.data?.success == true
          ? toast.info("VOTED ADDED SUCCESSFULLY", {
              draggable: true,
            })
          : toast.error(transfer?.data?.message);

        setInterval(() => {
          window.location.reload();
        }, 1000);
        console.log(transfer?.data);
      } catch (error) {
        toast.error("Error While Voting");
        console.log(error);
      }
    };
    votefn();
  };
  return (
    <>
      {Currstate?.session?.isValid ? (
        <div>
          <ToastContainer />
          <div className="form-n-instruction">
            <form className="portal">
              <h2 style={{ color: "orange" }}>
                Session Name : {Currstate.session?.Name}
              </h2>
              <span>
                <label htmlFor="Teacher">Select the Teacher</label>
                <select
                  name="Teacher"
                  id="Teacher"
                  onChange={(event) => {
                    let data = JSON.parse(event.target.value);
                    dispatch({
                      type: "SELECT TEACHER",
                      payload: {
                        _id: data._id,
                        NAME: data.NAME,
                      },
                    });
                  }}
                >
                  <option value={"selectTeacher"}>Select an option</option>
                  {Teacher?.map((e, i) => {
                    return (
                      <option
                        value={JSON.stringify(e)}
                        key={i}
                        style={{
                          color: student?.whomVoted?.includes(e._id)
                            ? "green"
                            : "",
                        }}
                      >
                        {e.NAME}
                      </option>
                    );
                  })}
                </select>
              </span>
            </form>
            <div className="instructions">
              <h2>Instructions</h2>
              <ul>
                <li>
                  Select the green Sessions only for the voting as they Are
                  Active Sessions
                </li>
                <li>For One Session You can vote a teacher only Once</li>
                <li>
                  After selecting the Teacher and Valid Session,The voting
                  Portal will Appear
                </li>
                <li>
                  LeftMost Circle indicates Least marks and RightMost Indicates
                  Most Marks
                </li>
              </ul>
            </div>
          </div>
          {Currstate.session.isValid && Currstate.teacher._id != "" && (
            <form className="feedback" onSubmit={(e) => Formhandler(e)}>
              <h3>{"Prof. " + Currstate.teacher?.NAME}</h3>
              <div className="feedback-form">
                <div>
                  {Object.values(question || {})
                    .slice(1, Object.values(question || {}).length - 1)
                    .map((e, i) => {
                      return (
                        <div className="qna">
                          <div className="question">
                            {i + 1 + ") "}
                            {e.toString()}
                          </div>
                          <div className="Radios">
                            <Box
                              sx={{
                                "& > legend": { mt: 2 },
                              }}
                            >
                              <Rating
                                name="votes"
                                value={Object.values(Currstate.vote)[i]}
                                onChange={(event, newValue) => {
                                  console.log(event);
                                  dispatch({
                                    type: "SAVE VOTE",
                                    payload: {
                                      question: `q${i}`,
                                      value: newValue,
                                    },
                                  });
                                }}
                              />
                            </Box>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <Button color="primary" variant="contained" type="submit">
                SUBMIT
              </Button>
            </form>
          )}
        </div>
      ) : (
        <h2 style={{ textAlign: "center", color: "white" }}>
          No Sessions Active Currently
        </h2>
      )}
    </>
  );
};

export default Portal;
