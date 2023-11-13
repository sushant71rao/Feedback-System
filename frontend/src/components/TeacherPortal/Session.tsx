import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Session } from "../../types/types";
import TopNav from "./Topnav";
import AddIcon from "@mui/icons-material/Add";
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
import Datagrid from "./DataGrid";
import Ballot from "@mui/icons-material/Ballot";
import Loading from "../Loading";

const SessionManage = () => {
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    console.log(event.target);
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  let [open, setOpen] = React.useState(false);
  const [sessionname, setsessionname] = React.useState();
  const navigate = useNavigate();
  const [loading, setloading] = React.useState(true);
  let [session, setsession] = React.useState<Session[]>([]);
  React.useEffect(() => {
    setloading(true);
    axios
      .get(import.meta.env.VITE_GET_SESSION, {
        withCredentials: true,
      })
      .then((res) => {
        setsession(res.data.session);
        console.log(session);
        setloading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SR",
      // flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "_id",
      headerName: "ObjectId",
      // flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <>
            <Chip
              label={params.row.isActive}
              variant="outlined"
              color={params.row.isActive == "Yes" ? "success" : "error"}
            ></Chip>
          </>
        );
      },
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
                data: params.row,
                api: "updatesession",
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
              Update
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                setsessionname(params.row._id);
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
          <div>
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
                <Ballot fontSize="large"></Ballot>
                Session
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  navigate(`/edit/`, {
                    state: {
                      userinfo: {
                        keysArr: ["Name", "isActive"],
                        api: "/addsession",
                        method: "put",
                      },
                    },
                  });
                }}
              >
                <AddIcon></AddIcon>
                <span style={{ fontWeight: "bolder" }}>Add Session</span>
              </Button>
            </div>
            <div className="tables">
              <Datagrid
                Data={session?.map((e) => {
                  return { ...e, isActive: e.isActive ? "Yes" : "No" };
                })}
                headings={columns}
              ></Datagrid>
            </div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>
                <div style={{ color: "#d32f2f", textAlign: "center" }}>
                  <CancelIcon style={{ fontSize: "50px" }}></CancelIcon>
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
                <Button onClick={handleClose} variant="contained">
                  CANCEL
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={(e) => {
                    handleClose(e);
                    axios
                      .delete(
                        import.meta.env.VITE_DELETE_SESSION +
                          `?_id=${sessionname}`,
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

export default SessionManage;
