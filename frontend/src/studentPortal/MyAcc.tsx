import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import mongoose from "mongoose";

const MyAcc = () => {
  let { student, setStudent } = useContext(AuthContext);
  let [save, setsave] = useState(false);
  let [formData, SetFormdata] = useState<{
    _id: mongoose.Schema.Types.ObjectId | undefined;
    name: String | undefined;
    email: string | undefined;
  }>({ name: student?.name, email: student?.email, _id: student?._id });
  function submitform(): void {
    let wait = async () => {
      try {
        let change = await axios.post(
          import.meta.env.VITE_UPDATE_STUDENT,
          {
            ...formData,
          },
          {
            withCredentials: true,
          }
        );
        console.log(change.data);
        toast.success("Profile Modified");
        setTimeout(() => {
          setStudent();
          localStorage.clear();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    wait();
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {/* <div
        style={{ margin: "10px 50px" }}
        className="small-screen"
        onClick={(e) => opener()}
      >
        <MenuIcon style={{ color: "black" }}></MenuIcon>
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
          // height: "50rem",
          // height: "100vh",
        }}
      >
        <ToastContainer></ToastContainer>
        <div className="myacc-wrap">
          <div className="user-info">
            <div className="avatar">
              <Avatar style={{ backgroundColor: "red" }}>S</Avatar>
            </div>
            <h2>{student?.name}</h2>
            <h3>{student?.class}</h3>
            <h4>{student?.rollno}</h4>
            <h6>{String(student?.email)}</h6>
          </div>
          <div className="account-section" style={{ border: "1px solid blue" }}>
            {!save ? (
              <>
                <TextField
                  disabled
                  label="Name"
                  value={student?.name}
                  variant="outlined"
                />
                <TextField
                  disabled
                  label="Email"
                  value={student?.email}
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
                      name: e.target.value,
                      email: old?.email,
                    }));
                  }}
                  value={formData?.name}
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => {
                    SetFormdata((old) => ({
                      ...old,
                      email: e.target.value,
                      name: old?.name,
                    }));
                  }}
                  type="email"
                  label="Email"
                  value={formData?.email}
                  variant="outlined"
                />
              </>
            )}

            <TextField
              disabled
              label="Id"
              value={student?.rollno}
              variant="outlined"
            />
            <TextField
              disabled
              label="Department"
              value={student?.class}
              variant="outlined"
            />
            {!save ? (
              <>
                <Button
                  variant="contained"
                  onClick={() => setsave(true)}
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
                <Button
                  disabled
                  variant="contained"
                  style={{
                    alignSelf: "start",
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled
                  variant="contained"
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setsave(false);
                    submitform();
                  }}
                  variant="contained"
                  style={{
                    alignSelf: "start",
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAcc;
