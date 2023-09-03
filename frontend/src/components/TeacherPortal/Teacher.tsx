import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Teacher } from "../../types/types";
import TopNav from "./Topnav";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

import Datagrid from "./DataGrid";
import Loading from "../Loading";

const TeacherManage = () => {
  const handleClose = (reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  //
  // console.log("render");

  let [open, setOpen] = React.useState(false);
  const [teachername, setteachername] = React.useState<{}>({});
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  let [teachers, setTeachers] = React.useState<Teacher[]>([]);
  React.useEffect(() => {
    setloading(true);
    axios
      .get(import.meta.env.VITE_GET_TEACHERS, {
        withCredentials: true,
      })
      .then((res) => {
        setTeachers(res.data.teachers);
        setloading(false);
      });
  }, []);
  //

  //

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SR",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "_id",
      headerName: "ObjectId",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "NAME",
      headerName: "Name",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "EMAIL",
      headerName: "Email",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "Role",
      headerName: "Role",
      headerClassName: "custom-header",
      flex: 1,
    },
    {
      field: "DEPARTMENT",
      headerName: "Department",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "custom-header",
      flex: 2.1,
      renderCell: (params) => {
        const handler = () => {
          navigate(`/edit/`, {
            state: {
              userinfo: {
                data: {
                  ...params.row,
                },
                api: "/updateteacher",
                method: "post",
              },
            },
          });
        };
        const handleopen = () => {
          setOpen(true);
        };
        return (
          <span style={{ display: "flex", gap: "10px" }}>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={() => handler}
            >
              Take Action
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                setteachername({ [params.row.NAME]: params.row._id });
                handleopen();
              }}
            >
              <DeleteIcon></DeleteIcon>
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TopNav id="" count={0} search={true}></TopNav>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <div
                style={{
                  fontWeight: "900",
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <PersonIcon></PersonIcon>
                Teachers
              </div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  ":hover": {
                    backgroundColor: "#404040",
                  },
                }}
                onClick={() => {
                  navigate(`/edit/`, {
                    state: {
                      userinfo: {
                        keysArr: ["NAME", "EMAIL", "ROLE", "DEPARTMENT"],
                        api: "/addteacher",
                        method: "put",
                      },
                    },
                  });
                }}
              >
                <AddIcon></AddIcon>
                <span style={{ fontWeight: "bolder" }}>Add Teacher</span>
              </Button>
            </div>

            <div className="tables">
              <Datagrid Data={teachers} headings={columns}></Datagrid>
            </div>

            <Dialog
              disableEscapeKeyDown
              open={open}
              onClose={() => handleClose}
            >
              <DialogTitle>
                <div style={{ color: "#d32f2f", textAlign: "center" }}>
                  <CancelIcon style={{ fontSize: "50px" }}></CancelIcon>
                  {/* Are You Sure You Want To Delete Class : */}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "23px",
                    fontWeight: "bold",
                    color: "#575757",
                  }}
                >
                  Are You Sure
                </div>
              </DialogTitle>
              <DialogContent
                style={{
                  color: "#575757",
                  fontSize: "18px",
                }}
              >
                <h5>Once Deleted You Cannot Restore it Again</h5>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose} variant="contained">
                  CANCEL
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    setloading(true);
                    axios
                      .delete(
                        import.meta.env.VITE_DELETE_TEACHER +
                          `?_id=${Object.values(teachername)[0]}`,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((e) => {
                        console.log(e);
                        // toast.success(
                        //   "Deleted the Class : " + Object.keys(classname)[0]
                        // )
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                >
                  DELETE
                </Button>
              </DialogActions>
              <ToastContainer></ToastContainer>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherManage;
