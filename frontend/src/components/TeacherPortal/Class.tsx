import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Class } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogTitle from "@mui/material/DialogTitle";
import TopNav from "./Topnav";
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import { ToastContainer, toast } from "react-toastify";

import Datagrid from "./DataGrid";
import Loading from "../Loading";

type state = {
  class: Class[] | [];
  count: number;
};

type action = {
  type: "GET CLASS";
  payload: any;
};

const ClassManage = () => {
  let [loading, setLoading] = React.useState(true);
  let [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  let [classname, setclassname] = React.useState<{ [key: string]: string }>({});
  //
  const handleClose = (reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  //
  // console.log(import.meta.env.VITE_GET_CLASS);
  //
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SR",
      headerClassName: "custom-header",

      flex: 0.3,
      //  width: 70
    },
    {
      field: "_id",
      headerName: "ObjectId",
      flex: 1,

      headerClassName: "custom-header",
    },
    {
      field: "CLASS",
      headerName: "NAME",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "DEPARTMENT",
      headerName: "DEPARTMENT",
      // type: 'number',

      headerClassName: "custom-header",
      flex: 0.8,
    },
    {
      field: "TEACHERS",
      headerName: "TEACHERS",
      headerClassName: "custom-header",
      flex: 0.7,
      type: "number",

      // width: 160,
    },
    {
      field: "action",
      headerName: "ACTIONS",
      flex: 1.4,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const handler = () => {
          navigate(`/edit/`, {
            state: {
              userinfo: {
                data: {
                  ...Current.class?.filter((e) => {
                    return e.CLASS == params.row.CLASS;
                  })[0],
                },
                api: "updateclass",
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
                setclassname({ [params.row.CLASS]: params.row._id });
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

  //
  ///fetching
  let initial: state = {
    class: [],
    count: 0,
  };
  let reducer = (State: state, Action: action): state => {
    switch (Action.type) {
      case "GET CLASS":
        return {
          ...State,
          class: Action.payload.data,
        };
    }
  };
  let [Current, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_GET_CLASS, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "GET CLASS", payload: { data: res.data.classes } });
        setLoading(false);
      })
      .catch((er) => {
        console.error("Error", er);
        setLoading(false);
      });
  }, []);

  ///

  return (
    <>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          <div>
            <ToastContainer></ToastContainer>
            <TopNav id="" count={0} search={false}></TopNav>
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
                <ClassIcon></ClassIcon>
                Class
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  navigate(`/edit/`, {
                    state: {
                      userinfo: {
                        keysArr: [
                          "CLASS",
                          "DEPARTMENT",
                          "TEACHERS",
                          "PASSWORD",
                        ],
                        api: "/addclass",
                        method: "post",
                      },
                    },
                  });
                }}
              >
                <AddIcon></AddIcon>
                <span style={{ fontWeight: "bolder" }}>Add Class</span>
              </Button>
            </div>

            <div className="tables">
              {/* {console.log(Current.class[0].TEACHERS.length)} */}
              <Datagrid
                Data={Current.class?.map((el) => {
                  return { ...el, TEACHERS: el?.TEACHERS?.length };
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
                <Button onClick={() => handleClose} variant="contained">
                  CANCEL
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    axios
                      .delete(
                        import.meta.env.VITE_DELETE_CLASS +
                          `?_id=${Object.values(classname)[0]}`,
                        {
                          withCredentials: true,
                        }
                      )
                      .then((e) => {
                        console.log(e);
                        toast.success(
                          "Deleted the Class : " + Object.keys(classname)[0]
                        );

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
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default ClassManage;
