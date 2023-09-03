import { Avatar, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Teacher, Vote } from "../../types/types";
import TopNav from "./Topnav";
import RankTable from "./RankTable";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";

const Ranking = () => {
  // let [queryParams] = useSearchParams();
  let { teacher } = useContext(AuthContext);
  // let string = "";
  const [queryParams] = useSearchParams();
  var query = "";

  queryParams.forEach((value, key) => {
    query = query + `${key}=${value}&`;
  });
  // console.log(query);
  let [DeptVotes, setDeptVotes] = useState<Vote[]>([]);


  let Teachers = useQuery<Teacher[]>([`Teachers`], async () => {
    let data = await axios.get(
      import.meta.env.VITE_GET_TEACHERS + teacher?.DEPARTMENT,
      {
        withCredentials: true,
      }
    );
    return data?.data.teacher as Teacher[];
  });
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_GET_DEPARTMENT_VOTES +
          teacher?.DEPARTMENT +
          `?${query}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setDeptVotes(res?.data?.DepartmentVotes);
      });
  }, []);
  return (
    <>
      {Teachers?.isLoading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <TopNav id="" count={DeptVotes?.length || 0} search={false}></TopNav>
          <div className="ranking">
            {Teachers?.isFetched &&
              DeptVotes?.map((e, ind) => {
                return (
                  ind < 3 && (
                    <div key={ind}>
                      {Teachers?.data?.map((el, i) => {
                        if (el?._id == e?.info?.T_Id) {
                          return (
                            <>
                              <div
                                className="box"
                                style={{
                                  backgroundColor:
                                    ind == 0
                                      ? "#ffe86c"
                                      : ind == 1
                                      ? "silver"
                                      : "#C08261",
                                }}
                                key={i}
                              >
                                <div key={i} className="badges">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                    key={i}
                                  >
                                    <Chip
                                      key={i}
                                      label={"#" + " " + String(ind + 1)}
                                      variant="filled"
                                      color="success"
                                      sx={{ color: "white", fontSize: "15px" }}
                                      size="medium"
                                    ></Chip>
                                    <h3 style={{ color: "black" }}>
                                      {ind == 0
                                        ? "FIRST POSITION"
                                        : ind == 1
                                        ? "SECOND POSITION"
                                        : "THIRD POSITION"}
                                    </h3>
                                  </div>
                                  <img
                                    src={
                                      "src/images/" +
                                      String(
                                        ind == 0
                                          ? "firstimg.jpg"
                                          : ind == 1
                                          ? "secondimg.png"
                                          : "3rd.png"
                                      )
                                    }
                                    alt="1st_img"
                                    width={ind == 1 ? 40 : 40}
                                  />
                                </div>
                                <div className="topper-info">
                                  <Avatar style={{ backgroundColor: "orange" }}>
                                    {el?.NAME.slice(0, 1)}
                                  </Avatar>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <h3 style={{ color: "rgb(0 0 0)" }}>
                                      {el?.NAME}
                                    </h3>
                                    <h5
                                      style={{
                                        color: "rgb(0 0 0)",
                                        textAlign: "left",
                                      }}
                                    >
                                      {el?.DEPARTMENT}
                                    </h5>
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
                                      (Number(e?.info?.Avg * 10) / 4).toFixed(
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

                                  <Rating
                                    name="read-only"
                                    value={e?.info?.Avg / 8}
                                    precision={0.5}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  )
                );
              })}
            {Teachers?.isFetched && (
              <div style={{ gridColumn: "span 3" }}>
                <RankTable
                  data={
                    DeptVotes?.map((el) => {
                      return {
                        ...el,
                        info: {
                          ...el.info,
                          T_Id:
                            Teachers?.data?.find((elem) => {
                              return elem._id == el.info.T_Id;
                            })?.NAME || "",
                        },
                      };
                    }) || []
                  }
                ></RankTable>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Ranking;
