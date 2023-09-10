import axios from "axios";
import React, { useContext, useState } from "react";
import "../styles/student/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { TextField } from "@mui/material";

const LoginPage = () => {
  const { setTeacher, setStudent } = useContext(AuthContext);
  const [formData, setformData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  let [url, setUrl] = React.useState("/loginstudent");
  let handler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + url,
        formData,
        {
          withCredentials: true,
        }
      );
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
      console.log(error);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  console.log(url);
  return (
    <>
      <div className="Login-body">
        <div className="container">
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
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
