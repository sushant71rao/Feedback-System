import { Avatar, Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "./Topnav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DialogBox from "./Dialogbox";

const ActionComponent = () => {
  // console.log("HIIIII", xy);
  const location = useLocation();
  const [user, setUser] = React.useState<{
    data: any;
    keysArr: any;
    api: string;
    method: string;
  }>(location.state.userinfo);

  let Roles = ["Admin", "Teacher"];

  let [save, setSave] = React.useState(
    user?.keysArr == undefined ? false : true
  );
  // console.log(location);
  let nav = useNavigate();
  let removeArr = [
    "PASSWORD",
    "password",
    "QUALIFICATION",
    "image",
    "__v",
    "id",
    "TEACHERS",
    "whomVoted",
    "ROLE",
    "Role",
    "_id",
  ];
  let handlesave = () => {
    let temp;
    user?.data?.isActive
      ? (temp = {
          ...user.data,
          isActive:
            user.data?.isActive == "Yes" || user.data?.isActive == "yes"
              ? true
              : false,
        })
      : (temp = {
          ...user.data,
        });

    var method = user?.method || "";

    method == "post" &&
      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + String(user.api),
          {
            ...temp,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data.success);
          res.data.success == true && toast.success("Added Succesfully");
          nav(-1);
        })
        .catch((e) => {
          console.log(e);
        });

    method == "put" &&
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL + String(user.api),
          {
            ...temp,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data.success);
          res.data.success == true && toast.success("Added Succesfully");
          nav(-1);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.message);
        });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <TopNav id="" count={0} search={false}></TopNav>
      <div className="myacc-wrap">
        <div className="user-info">
          {
            <>
              <div className="avatar">
                <Avatar style={{ backgroundColor: "red" }}>
                  {String(
                    user?.data?.name ||
                      user?.data?.CLASS ||
                      user?.data?.NAME ||
                      user?.data?.Name ||
                      ""
                  ).slice(0, 1)}
                </Avatar>
              </div>
              {user?.keysArr == undefined &&
                Object.entries(user?.data)?.map((el) => {
                  return !removeArr.includes(el[0]) && <h4>{String(el[1])}</h4>;
                })}

              {user?.keysArr?.map((ele: any) => {
                return (
                  <>
                    {!removeArr.includes(ele) && <h3>{user?.data?.[ele]}</h3>}
                  </>
                );
              })}
            </>
          }
          {/* {location.state.userinfo?.keysArr == undefined && (
            <h6>{String(user?.data._id)}</h6>
          )} */}
          {!save && user?.keysArr == undefined && (
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                onClick={() => setSave(true)}
                style={{ alignSelf: "start" }}
              >
                Change
              </Button>
            </div>
          )}
        </div>
        <div className="account-section">
          {!save ? (
            //  Checking whether clicked on change button or not
            <>
              {/* Section for Updating the data */}
              {user?.keysArr == undefined &&
                Object.keys(user?.data).map((el) => {
                  return (
                    <>
                      {!removeArr.includes(el) && (
                        <>
                          <TextField
                            disabled
                            type="text"
                            label={String(el)}
                            value={user.data[el]}
                            variant="outlined"
                          />
                        </>
                      )}
                      {el == "Role" && !user.api.includes("student") && (
                        <TextField
                          select
                          disabled
                          label="Select Role"
                          defaultValue={user.data[el]}
                          sx={{ width: "14rem" }}
                        >
                          {Roles.map((el, ind) => (
                            <MenuItem key={ind} value={el}>
                              {el}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}

                      {el == "TEACHERS" && (
                        <Button disabled variant="contained">
                          ADD TEACHERS
                        </Button>
                      )}
                    </>
                  );
                })}
              {user?.keysArr != undefined && (
                <>
                  {user?.keysArr?.map((e: any) => {
                    return (
                      <>
                        {!removeArr.includes(e) && (
                          <TextField
                            disabled
                            type="text"
                            label={String(e)}
                            value={user.data[e]}
                            variant="outlined"
                          />
                        )}
                        {e == "ROLE" && !user.api.includes("student") && (
                          <TextField
                            select
                            label="Select Role"
                            defaultValue=" Teacher"
                            sx={{ width: "14rem" }}
                            onChange={(event) => {
                              setUser((old: any) => ({
                                ...old,
                                data: {
                                  ...old.data,
                                  [e]: event.target.value,
                                },
                              }));
                            }}
                          >
                            {Roles.map((el, ind) => (
                              <MenuItem key={ind} value={el}>
                                {el}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                        {e == "TEACHERS" && (
                          <Button disabled variant="contained">
                            ADD TEACHERS
                          </Button>
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              {user?.keysArr != undefined && (
                <>
                  {/* Creating a new record section */}
                  {user?.keysArr?.map((e: any) => {
                    return (
                      <>
                        {!removeArr.includes(e) && (
                          <TextField
                            type={e == "PASSWORD" ? "password" : "text"}
                            label={String(e)}
                            value={user?.data?.[e]}
                            onChange={(event) => {
                              setUser((old: any) => ({
                                ...old,
                                data: {
                                  ...old.data,
                                  [e]: event.target.value,
                                },
                              }));
                            }}
                            variant="outlined"
                          />
                        )}
                        {e == "ROLE" && !user.api.includes("student") && (
                          <TextField
                            select
                            label="Select Role"
                            defaultValue=" Teacher"
                            sx={{ width: "14rem" }}
                            onChange={(event) => {
                              setUser((old: any) => ({
                                ...old,
                                data: {
                                  ...old.data,
                                  [e]: event.target.value,
                                },
                              }));
                            }}
                          >
                            {Roles.map((el, ind) => (
                              <MenuItem key={ind} value={el}>
                                {el}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                        {e == "TEACHERS" && !user.api.includes("student") && (
                          <>
                            <div className="addTeachers">
                              <DialogBox
                                TEACHERS={user?.data?.TEACHERS}
                                send={(arg) => {
                                  setUser((old) => ({
                                    ...old,
                                    data: {
                                      ...old.data,
                                      TEACHERS: arg,
                                    },
                                  }));
                                }}
                              ></DialogBox>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}
                </>
              )}
              {/* Section for Updating the data */}
              {user?.keysArr == undefined &&
                Object.entries(user?.data)?.map((el) => {
                  return (
                    <>
                      {!removeArr.includes(el[0]) && el[0] != "_id" && (
                        <TextField
                          type="text"
                          label={String(el[0])}
                          value={user.data[el[0]]}
                          onChange={(event) => {
                            setUser((old) => ({
                              ...old,
                              data: {
                                ...old.data,
                                [el[0]]: event.target.value,
                              },
                            }));
                          }}
                          variant="outlined"
                        />
                      )}
                      {(el[0] == "ROLE" || el[0] == "Role") &&
                        !user.api.includes("student") && (
                          <TextField
                            select
                            label="Select Role"
                            defaultValue={user.data[el[0]]}
                            sx={{ width: "14rem" }}
                            onChange={(event) => {
                              setUser((old: any) => ({
                                ...old,
                                data: {
                                  ...old.data,
                                  [el[0]]: event.target.value,
                                },
                              }));
                            }}
                          >
                            {Roles.map((el, ind) => (
                              <MenuItem key={ind} value={el}>
                                {el}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      {el[0] == "TEACHERS" && (
                        <>
                          <div className="addTeachers">
                            <DialogBox
                              TEACHERS={user?.data?.TEACHERS}
                              send={(arg) => {
                                setUser((old) => ({
                                  ...old,
                                  data: {
                                    ...old.data,
                                    TEACHERS: arg,
                                  },
                                }));
                              }}
                            ></DialogBox>
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
            </>
          )}

          {!save && location.state.userinfo?.NAME != "" ? (
            <div className="savebtns">
              <Button
                disabled
                variant="contained"
                size="large"
                style={{
                  alignSelf: "start",
                }}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="savebtns">
              <Button
                type="submit"
                onClick={() => {
                  setSave(false);
                  handlesave();
                }}
                variant="contained"
                size="large"
                color="success"
                style={{
                  alignSelf: "start",
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "flex-end",
          }}
        >
          <Button
            style={{ backgroundColor: "#707070" }}
            variant="contained"
            onClick={() => nav(-1)}
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionComponent;
