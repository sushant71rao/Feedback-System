import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { Student } from "../../types/types";
import TopNav from "./Topnav";
import {
  Button,
  Chip,
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

const Table = () => {
  const handleClose = (reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  let [open, setOpen] = React.useState(false);
  const [username, setusername] = React.useState<{}>({});
  const navigate = useNavigate();
  let [users, setusers] = React.useState<Student[]>([]);
  let [loading, setloading] = React.useState(true);
  let [classes, setClasses] = React.useState<{ CLASS: string; TEACHERS: [] }[]>(
    []
  );
  //

  //

  React.useEffect(() => {
    setloading(true);
    axios
      .get(import.meta.env.VITE_GET_STUDENTS, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setusers(res.data.student);
        setloading(false);
      });

    setloading(true);
    axios
      .get(import.meta.env.VITE_GET_CLASS, {
        withCredentials: true,
      })
      .then((res) => {
        setClasses(res.data.classes);
        setloading(false);
      });
  }, []);
  {
    console.log(open);
  }

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
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "email",
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
      field: "Whom Voted",
      headerName: "Voted",
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={
              String(params.row?.whomVoted.length) +
              "/" +
              String(params?.row.teachers?.length)
            }
            color={
              params.row?.whomVoted.length / params?.row.teachers?.length == 1
                ? "success"
                : "error"
            }
            style={{ fontWeight: "bold" }}
            variant="outlined"
          ></Chip>
        );
      },
      headerClassName: "custom-header",
    },
    {
      field: "rollno",
      headerName: "Roll No",
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
          let tmp = users?.filter((ele) => {
            return ele._id == params.row._id;
          });
          navigate(`/edit/`, {
            state: {
              userinfo: {
                data: {
                  ...tmp[0],
                },
                api: "/updatestudent",
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
              onClick={handler}
            >
              Take Action
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                setusername({ [params.row.name]: params.row._id });
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
      {loading == true ? (
        <Loading></Loading>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TopNav search id="" count={0}></TopNav>
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
                <SchoolIcon fontSize="large"></SchoolIcon>
                Student
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  navigate(`/edit/`, {
                    state: {
                      userinfo: {
                        keysArr: [
                          "name",
                          "email",
                          "department",
                          "rollno",
                          "class",
                        ],
                        api: "/addstudent",
                        method: "put",
                      },
                    },
                  });
                }}
              >
                <AddIcon></AddIcon>
                <span style={{ fontWeight: "bolder" }}>Add Student</span>
              </Button>
            </div>

            <div className="tables">
              <Datagrid
                Data={users?.map((e) => {
                  return {
                    ...e,
                    teachers: classes.filter((el) => {
                      return e.class == el.CLASS;
                    })[0]?.TEACHERS,
                  };
                })}
                headings={columns}
              ></Datagrid>
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
                <Button onClick={() => handleClose("")} variant="contained">
                  CANCEL
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleClose("");
                    axios
                      .delete(
                        import.meta.env.VITE_DELETE_STUDENT +
                          `?_id=${Object.values(username)[0]}`,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((e) => {
                        console.log(e);
                        // toast.success(
                        //   "Deleted the Class : " + Object.keys(classname)[0]
                        // );
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
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

export default Table;
