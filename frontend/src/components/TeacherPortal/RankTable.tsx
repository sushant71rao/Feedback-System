import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Vote } from "../../types/types";
import { Avatar, Rating } from "@mui/material";

interface props {
  data: Vote[] | [];
}

let value = ["AVERAGE", "GOOD", "VERY GOOD", "EXCELLENT", "OUTSTANDING"];
let RankTable = (Props: props) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        // aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ color: "grey" }}>
              RANK
            </TableCell>
            <TableCell align="left" style={{ color: "grey" }}>
              NAME
            </TableCell>
            <TableCell align="left" style={{ color: "grey" }}>
              RESULT&nbsp;(%)
            </TableCell>
            <TableCell align="left" style={{ color: "grey" }}>
              BEST QUESTION
            </TableCell>
            <TableCell align="left" style={{ color: "grey" }}>
              RATING
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Props?.data.map((row, ind) => (
            <TableRow
              key={String(row.info.T_Id)}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                // height: "170%",
              }}
            >
              <TableCell align="center">
                {ind >= 3 && <h3>{ind + 1}</h3>}
                {ind < 3 && (
                  <img
                    src={
                      "/images/" +
                      String(
                        ind == 0
                          ? "firstimg.jpg"
                          : ind == 1
                          ? "secondimg.png"
                          : ind == 2 && "3rd.png"
                      )
                    }
                    style={{ mixBlendMode: "darken" }}
                    width={40}
                  />
                )}
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {<Avatar sx={{ bgcolor: "#7a7a7a" }}>{}</Avatar>}
                {String(row?.info?.T_Id)}
              </TableCell>
              <TableCell align="left">
                {Number((row?.info?.Avg * 10) / 4).toFixed(2)}
              </TableCell>
              <TableCell align="left">
                {Object.entries(row?.voteValue)
                  .sort((a, b) => Number(b[1]) - Number(a[1]))[0]
                  .reduce((x, y) => {
                    return (
                      String(x) +
                      " " +
                      "(" +
                      String(
                        Number((Number(y) * 20) / row?.info?.count).toFixed(2)
                      ) +
                      "%" +
                      ")"
                    );
                  })
                  .toString()}
              </TableCell>
              <TableCell align="left">
                <Rating
                  name="read-only"
                  value={row?.info?.Avg / 8}
                  precision={0.5}
                  readOnly
                />
                <h5>{value[Math.floor(row?.info?.Avg / 8)]}</h5>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankTable;
