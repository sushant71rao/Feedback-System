import React, { useContext, useState } from "react";
import "../styles/student/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress, TextField } from "@mui/material";
import AxiosInstance from "./AxiosComponent";
// import Loading from "./Loading";

const LoginPage = () => {
  const { setTeacher, setStudent } = useContext(AuthContext);
  const [formData, setformData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  let [url, setUrl] = React.useState("/loginstudent");
  let handler = async (event: React.FormEvent) => {
    console.log(loading);
    event.preventDefault();
    try {
      setLoading(true);
      const response = await AxiosInstance.put(url, formData, {
        withCredentials: true,
      });
      setLoading(false);
      if (response.data.success) {
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });

        if (response.data.user.Role == "Student") {
          setStudent(response.data.user);
        } else {
          setTeacher(response.data.user);
        }
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem(
          "Valid",
          JSON.stringify(Date.now() * 4 * 60 * 60 * 1000)
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const RandomStudent = async () => {
    try {
      let res = await AxiosInstance.get("/student/randomlogin");

      if (res?.data?.success) {
        setStudent(res?.data?.setUser);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        localStorage.setItem(
          "Valid",
          JSON.stringify(Date.now() * 4 * 60 * 60 * 1000)
        );
      }
      window.location.reload();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const RandomTeacher = async () => {
    try {
      let res = await AxiosInstance.get("/teacher/randomlogin");

      if (res?.data?.success) {
        setTeacher(res?.data?.setUser);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        localStorage.setItem(
          "Valid",
          JSON.stringify(Date.now() * 4 * 60 * 60 * 1000)
        );
      }
      window.location.reload();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(url);
  return (
    <>
      <div className="Login-body">
        <div className="container">
          {loading == false ? (
            <div className="card">
              {/* <h1>FEEDBACK SYSTEM</h1> */}
              <h2>CHOOSE ACCOUNT TYPE</h2>
              <div className="selection">
                <div
                  style={{ position: "relative" }}
                  onClick={() => {
                    setUrl("/loginstudent");
                    document
                      .getElementById("student")
                      ?.classList.toggle("remove");
                    document.getElementById("teacher")?.classList.add("remove");
                  }}
                >
                  <img src="/images/StudentIcon.png" alt="img" width={80} />
                  <h3>STUDENT</h3>
                  <img
                    src="/images/TickIcon.png"
                    alt="img"
                    id="student"
                    width={30}
                    style={{
                      position: "absolute",
                      bottom: "-5%",
                      right: "-5%",
                    }}
                  />
                </div>
                <div
                  onClick={() => {
                    setUrl("/loginteacher");

                    document
                      .getElementById("teacher")
                      ?.classList.toggle("remove");
                    document.getElementById("student")?.classList.add("remove");
                  }}
                  style={{
                    position: "relative",
                  }}
                >
                  <img src="/images/teacherIcon.png" alt="img" width={80} />
                  <h3>TEACHER</h3>
                  <img
                    src="/images/TickIcon.png"
                    id="teacher"
                    className="remove"
                    alt="img"
                    width={30}
                    style={{
                      position: "absolute",
                      bottom: "-5%",
                      right: "-5%",
                    }}
                  />
                </div>
              </div>

              <form onSubmit={handler}>
                <TextField
                  size="small"
                  variant="standard"
                  type="email"
                  name="email"
                  label="Email"
                  value={formData?.email}
                  onChange={handleFormChange}
                ></TextField>

                <TextField
                  type="text"
                  size="small"
                  variant="standard"
                  label="Password"
                  name="password"
                  value={formData?.password}
                  onChange={handleFormChange}
                ></TextField>
                <input type="submit" value="Submit" id="loginbtn" />
              </form>
              <div className="test-account">
                <button onClick={() => RandomStudent()}>Test Student</button>
                <button onClick={() => RandomTeacher()}>Test Teacher</button>
              </div>
            </div>
          ) : (
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress></CircularProgress>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
