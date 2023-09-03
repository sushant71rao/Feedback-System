import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import mongoose from "mongoose";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "55px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "12px solid #c4c4c4",
  boxShadow: 24,
  p: 4,
};

const MyAcc = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    document.documentElement.style.background = "#fffff";
  });
  let { teacher, setTeacher } = useContext(AuthContext);
  let [save, setsave] = useState(false);
  let [formData, SetFormdata] = useState<{
    _id: mongoose.Schema.Types.ObjectId | undefined;
    NAME: String | undefined;
    EMAIL: string | undefined;
  }>({
    _id: teacher?._id,
    NAME: teacher?.NAME,
    EMAIL: teacher?.EMAIL,
  });
  let [pass, setPass] = React.useState<{
    oldPassword: String;
    currentPassword: String;
  }>({ oldPassword: "", currentPassword: "" });
  function submitform(): void {
    let wait = async () => {
      try {
        let change = await axios.post(
          import.meta.env.VITE_UPDATE_TEACHER,
          {
            ...formData,
          },
          {
            withCredentials: true,
          }
        );
        console.log(change);
        toast.success("Profile Modified");
        setTimeout(() => {
          setTeacher();
          localStorage.clear();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    wait();
  }
  function opener() {
    document.querySelector(".sidenav")?.classList.remove("closer");
  }
  let changePassHandler = async () => {
    let res = await axios
      .put(
        import.meta.env.VITE_CHANGE_TEACHER_PASSWORD,
        {
          ...pass,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err: any) => {
        // console.log(err.response.data.message);
        toast.warning(err.response.data.message || "Error occuced");
      });
    console.log(res);
    toast.success("PassWord Changed Successfully");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{ margin: "10px 50px" }}
        className="small-screen"
        onClick={() => opener()}
      >
        <MenuIcon style={{ color: "black" }}></MenuIcon>
      </div>

      <div>
        <ToastContainer></ToastContainer>
        <div className="myacc-wrap">
          <div className="user-info">
            <div className="avatar">
              <Avatar style={{ backgroundColor: "red" }}>
                {teacher?.NAME.slice(0, 1)}
              </Avatar>
            </div>
            <h2>{teacher?.NAME}</h2>
            <h3>{teacher?.DEPARTMENT}</h3>
            <h4>{teacher?.EMAIL}</h4>
            <h5>{String(teacher?._id)}</h5>
            <div>
              {!save ? (
                <Button
                  variant="contained"
                  onClick={() => setsave(true)}
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
              )}
            </div>
          </div>
          <div className="account-section">
            {!save ? (
              <>
                <TextField
                  disabled
                  label="Name"
                  value={teacher?.NAME}
                  variant="outlined"
                />
                <TextField
                  disabled
                  label="Email"
                  value={teacher?.EMAIL}
                  variant="outlined"
                />
              </>
            ) : (
              <>
                <TextField
                  label="Name"
                  onChange={(e) => {
                    SetFormdata((old) => ({
                      ...old,
                      NAME: e.target.value,
                      EMAIL: old?.EMAIL,
                    }));
                  }}
                  value={formData?.NAME}
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => {
                    SetFormdata((old) => ({
                      ...old,
                      EMAIL: e.target.value,
                      NAME: old?.NAME,
                    }));
                  }}
                  type="email"
                  label="Email"
                  value={formData?.EMAIL}
                  variant="outlined"
                />
              </>
            )}

            <TextField
              disabled
              label="Id"
              value={teacher?._id}
              variant="outlined"
            />
            <TextField
              disabled
              label="Department"
              value={teacher?.DEPARTMENT}
              variant="outlined"
            />

            <div
              style={{
                gridColumn: "span 2",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                disabled={!save}
                type="submit"
                onClick={() => {
                  setsave(false);
                  submitform();
                }}
                color="success"
                variant="contained"
              >
                <h4>Save</h4>
              </Button>
              <Button disabled={!save} onClick={handleOpen}>
                Change Password
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <h3>CHANGE PASSWORD</h3>
                  <FormControl>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Old Password
                    </InputLabel>
                    <Input
                      value={pass?.oldPassword}
                      onChange={(e) => {
                        setPass((old) => ({
                          ...old,
                          oldPassword: e.target.value,
                        }));
                      }}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="new-password">New Password</InputLabel>
                    <Input
                      value={pass?.currentPassword}
                      id="new-password"
                      onChange={(e) => {
                        setPass((old) => ({
                          ...old,
                          currentPassword: e.target.value,
                        }));
                      }}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      changePassHandler();
                    }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAcc;
