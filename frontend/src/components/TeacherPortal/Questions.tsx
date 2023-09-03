import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Questionarrie } from "../../types/types";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import TopNav from "./Topnav";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";

const Questions = () => {
  let [disabled, setDisabled] = React.useState(true);
  let [formdata, setFormData] = useState<Questionarrie>({
    q0: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    _id: "",
  });
  let Questions = useQuery<Questionarrie>(["questions"], async () => {
    let resp = await axios.get(import.meta.env.VITE_GET_QUESTIONS, {
      withCredentials: true,
    });
    setFormData(resp.data.questions[0]);
    return resp.data.questions[0];
  });

  let handleSubmit = async () => {
    let temp: Partial<Questionarrie> = { ...formdata };
    delete temp["_id"];
    delete temp["__v"];
    try {
      let update = await axios.put(
        import.meta.env.VITE_UPDATE_QUESTIONS + `/${formdata?._id}`,
        {
          ...temp,
        },
        {
          withCredentials: true,
        }
      );
      update?.data?.success && toast.success("UPDATED SUCCESSFULLY");
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Error While Updating");
    }
  };
  console?.table(formdata);

  return (
    <>
      <ToastContainer></ToastContainer>
      {Questions?.isLoading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <TopNav id="" search={false} count={0}></TopNav>
          <h2
            style={{
              padding: "20px 0px",
              color: "#1e1e1e",
              fontWeight: "bold",
            }}
          >
            MANAGE QUESTIONS
          </h2>
          <form
            className="questions"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {Object.entries(formdata || {}).map((el) => {
              return (
                el[0] != "_id" &&
                el[0] != "__v" && (
                  <TextField
                    value={el?.[1]}
                    label={el?.[0]}
                    onChange={(e) => {
                      setFormData((old) => ({
                        ...old,
                        [el[0]]: e.target.value,
                      }));
                    }}
                    disabled={disabled}
                  >
                    {el?.[1]}
                  </TextField>
                )
              );
            })}
            <div
              style={{
                gridColumn: "span 2",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                onClick={() => {
                  setDisabled(false);
                }}
                variant="contained"
                color="primary"
              >
                CHANGE
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={disabled}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Questions;
