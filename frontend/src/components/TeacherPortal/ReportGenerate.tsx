import { useContext, useState } from "react";
import axios from "axios";

import Rating from "@mui/material/Rating";
import { Questionarrie, Teacher, Vote } from "../../types/types";

import { AuthContext } from "../../context/AuthContext";
import PieChart from "./Piechart";

import { useSearchParams } from "react-router-dom";
import TopNav from "./Topnav";

import { useQuery } from "@tanstack/react-query";
import { Avatar, Chip } from "@mui/material";
import RankCharts from "./RankChart";

const ReportGenerate = () => {
  ////////////
  let { teacher } = useContext(AuthContext);
  let value = ["AVERAGE", "GOOD", "VERY GOOD", "EXCELLENT", "OUTSTANDING"];
  let [noVotes, setNoVotes] = useState(true);
  ///////////////
  const [queryParams] = useSearchParams();
  var query = "";
  let classQuery = "";
  // var searchQuery = "";
  var idfetch = "";
  queryParams.forEach((value, key) => {
    if (key != "id") {
      query = query + `${key}=${value}&`;
    }
    if (key == "Class") {
      classQuery = classQuery + `${key}=${value}&`;
    }
    if (key == "id") {
      idfetch = `${value}`;
    }
  });
  // console.log(idfetch);
  let Votes;
  let Teacher;
  let Question;
  let Department;
  var Best: any;

  if (idfetch != "") {
    Votes =
      useQuery<Vote>([`Votes`], async () => {
        let data = await axios.get(
          import.meta.env.VITE_GET_REQUIRED_VOTES + `${idfetch}/?${query}`,
          {
            withCredentials: true,
          }
        );
        setNoVotes(data?.data.success);
        return data?.data.votes;
      }) || [];
    Teacher = useQuery<Teacher>(["Teacher"], async () => {
      let data = await axios.get(
        import.meta.env.VITE_GET_TEACHERS + `?id=${idfetch}`,
        {
          withCredentials: true,
        }
      );
      return data?.data?.teachers[0];
    });
    Question = useQuery<Questionarrie>(["Questions"], async () => {
      let res = await axios.get(import.meta.env.VITE_GET_QUESTIONS, {
        withCredentials: true,
      });
      return res?.data.questions[0];
    });

    Department = useQuery<Vote[]>(["Department"], async () => {
      let res = await axios.get(
        import.meta.env.VITE_GET_DEPARTMENT_VOTES +
          `${teacher?.DEPARTMENT}?${query}`,
        {
          withCredentials: true,
        }
      );

      return res?.data.DepartmentVotes;
    });

    Best = Object.entries(Votes?.data?.voteValue || {}).sort((x, y) => {
      return Number(y[1]) - Number(x[1]);
    })[0];
  }

  return (
    <>
      {!noVotes ? (
        <h3>No Votes Found</h3>
      ) : (
        <>
          <TopNav count={2} id={idfetch} search={true}></TopNav>
          {idfetch != "" && (
            <div className="reports">
              <div className="box namecard" style={{ maxWidth: "20rem" }}>
                <div className="topper-info">
                  <Avatar style={{ backgroundColor: "orange" }}>
                    {Teacher?.data?.NAME?.slice(0, 1) || ""}
                  </Avatar>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ color: "#303030" }}>{Teacher?.data?.NAME}</h3>
                    <h5 style={{ color: "#666666", textAlign: "left" }}>
                      {Teacher?.data?.DEPARTMENT}
                    </h5>
                    <h6>{Votes?.data?.info?.Class}</h6>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Chip
                    label={
                      Number((Number(Votes?.data?.info?.Avg) * 20) / 8).toFixed(
                        2
                      ) + "% MARKS"
                    }
                    // color="error"
                    variant="filled"
                    sx={{
                      fontSize: "15px",
                      bgcolor: "#515151",
                      color: "white",
                    }}
                  ></Chip>
                  <div>
                    <Rating
                      value={Number(Votes?.data?.info?.Avg) / 8}
                      precision={0.5}
                      readOnly
                    />
                    <h4>
                      {value[Math.floor(Number(Votes?.data?.info?.Avg) / 8)]}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="additionals">
                <div
                  className="box"
                  style={{
                    color: "grey",
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px",
                  }}
                >
                  <h3>
                    AVERAGE MARKS
                    <h2 style={{ color: "green" }}>
                      {Number(Votes?.data?.info?.Avg).toFixed(2)}/40
                    </h2>
                  </h3>
                  <h5>
                    NUMBER OF VOTES EVALUATED = {Votes?.data?.info?.count}
                  </h5>
                  <Rating
                    value={Number(Votes?.data?.info?.Avg) / 8}
                    precision={0.5}
                    readOnly
                  ></Rating>
                </div>
                <div
                  className="box"
                  style={{
                    color: "grey",
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px",
                  }}
                >
                  <h3>
                    BEST QUESTION
                    <h2 style={{ color: "green", fontSize: "23px" }}>
                      {
                        Object.entries(Question?.data || {}).find((el) => {
                          return el[0] == String(Best[0]);
                        })?.[1]
                      }
                    </h2>
                  </h3>
                  <h4>
                    {Best &&
                      (Best[1] * 20) / Number(Votes?.data?.info?.count || 1)}
                    % MARKS
                  </h4>
                  <Rating
                    value={Best ? Number(Best[1] * 20) : 0}
                    precision={0.5}
                    readOnly
                  ></Rating>
                </div>
              </div>

              {Votes?.isFetched && Department?.isFetched && (
                <div className="graphs">
                  <div className="box">
                    <h2 style={{ color: "#414141", textAlign: "center" }}>
                      RANKINGS
                    </h2>
                    <RankCharts
                      State={Department?.data?.map((el) => {
                        return {
                          [String(el?.info?.T_Id)]: el?.info?.Avg,
                        };
                      })}
                      count={Department?.data?.length || 0}
                      id={String(Teacher?.data?._id)}
                      vertical
                    />
                  </div>
                  <div className="box">
                    <h2 style={{ color: "#414141", textAlign: "center" }}>
                      VOTES PER QUESTION
                    </h2>
                    <PieChart
                      State={[]}
                      count={Votes?.data?.info?.count || 0}
                      Marks={Votes?.data?.voteValue || {}}
                    ></PieChart>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReportGenerate;
