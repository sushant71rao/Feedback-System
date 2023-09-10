import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer } from "react-toastify";

import { Button, Chip, TextField } from "@mui/material";
import { Teacher } from "../../types/types";
import axios from "axios";
interface props {
  TEACHERS: string[];
  send: (arg: string[]) => void;
}

const DialogBox = (Props: props) => {
  var text = "";
  Props.TEACHERS?.map((e) => {
    text += `id=${e}&`;
  });
  const [open, setOpen] = React.useState(false);
  const [fetch, setFetch] = React.useState<Teacher[]>([]);
  const [search, setsearch] = React.useState("");
  const [chip, setchip] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    text != "" &&
      axios
        .get(import.meta.env.VITE_GET_TEACHERS + `?${text}`, {
          withCredentials: true,
        })
        .then((res) =>
          res.data?.teachers?.map((e: any) => {
            setchip((old) => ({ ...old, [e.NAME]: e._id }));
          })
        );
    console.log(chip);
  }, []);

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      search == ""
        ? setFetch([])
        : axios
            .get(import.meta.env.VITE_GET_TEACHERS + `?keyword=${search}`, {
              withCredentials: true,
            })
            .then((res) => setFetch(res.data.teachers));
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleDelete(e: any): void {
    let t = { ...chip };
    delete t[e];
    setchip(t);
  }
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    console.log(event.currentTarget);

    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Button
        variant="contained"
        color="info"
        style={{ fontWeight: "bold" }}
        size="large"
        onClick={handleClickOpen}
      >
        ADD TEACHERS
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <div
          style={{
            border: "10px solid #69ccff",
            minHeight: "30rem",
            width: "30rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold",color:"#444444" }}>
            SEARCH AND ADD TEACHERS
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Search"
              variant="filled"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />

            <div>
              {fetch &&
                fetch?.map((e, i) => {
                  return (
                    <div
                      className="search-drops"
                      key={i}
                      onClick={() => {
                        setchip((old) => ({
                          ...old,
                          [e.NAME]: String(e._id),
                        }));
                      }}
                    >
                      {e.NAME}
                    </div>
                  );
                })}
            </div>
            <div className="text-chips">
              {
                <div className="chips">
                  {Object.entries(chip).map((e) => {
                    return (
                      <Chip
                        label={e[0]}
                        color="success"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onDelete={() => handleDelete(e[0])}
                      />
                    );
                  })}
                </div>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={(e) => {
                Props.send(Object.values(chip));
                handleClose(e);
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogBox;
