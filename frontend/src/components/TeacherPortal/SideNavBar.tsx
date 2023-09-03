import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Man4Icon from "@mui/icons-material/Man4";
import ClassIcon from "@mui/icons-material/Class";
import BallotIcon from "@mui/icons-material/Ballot";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PieChartIcon from "@mui/icons-material/PieChart";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const SideNavBar = () => {
  const [activeLink, setActiveLink] = React.useState("");
  console.log(activeLink);
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const { teacher, setTeacher } = React.useContext(AuthContext);

  function MenuToggler(): void {
    document.querySelector(".sidenav")?.classList.add("closer");
  }

  console.log(document.querySelector(".sidenav"));
  // console.log(fetchData);
  return (
    <div className="sidenav">
      <p
        id="cross"
        className="small-screen"
        style={{
          padding: "10px 0px 0px 10px",
          cursor: "pointer",
          position: "absolute",
        }}
        onClick={() => MenuToggler()}
      >
        &#10060;
      </p>
      <div className="logo">
        <img src="/src/images/FEEDBACK_SYMBOL.jpg" width={40}></img>
        <span>FEEDBACK SYSTEM</span>
      </div>
      <div className="route-logout">
        <ul>
          <Link
            to="/"
            onClick={() => handleLinkClick("/")}
            className={location.pathname === "/" ? "active" : ""}
          >
            <PieChartIcon></PieChartIcon>
            <span>Analytics</span>
          </Link>

          <Link
            to="/myaccount"
            onClick={() => handleLinkClick("/myaccount")}
            className={location.pathname === "/myaccount" ? "active" : ""}
          >
            <AccountBoxIcon></AccountBoxIcon>
            <span>My Account</span>
          </Link>
          {teacher?.Role == "Admin" && (
            <>
              <Link
                to="/students"
                onClick={() => handleLinkClick("/students")}
                className={location.pathname === "/students" ? "active" : ""}
              >
                <ManageAccountsIcon></ManageAccountsIcon>
                <span>Students</span>
              </Link>

              <Link
                to="/teachers"
                onClick={() => handleLinkClick("/teachers")}
                className={
                  window.location.pathname === "/teachers" ? "active" : ""
                }
              >
                <Man4Icon></Man4Icon>
                <span>Teachers</span>
              </Link>

              <Link
                to="/class"
                onClick={() => handleLinkClick("/class")}
                className={location.pathname === "/class" ? "active" : ""}
              >
                <ClassIcon></ClassIcon>
                <span>Classes</span>
              </Link>

              <Link
                to="/session"
                className={location.pathname === "/session" ? "active" : ""}
                onClick={() => handleLinkClick("/session")}
              >
                <BallotIcon></BallotIcon>
                <span>Sessions</span>
              </Link>
              <Link
                to="/report"
                className={location.pathname === "/report" ? "active" : ""}
                onClick={() => handleLinkClick("/report")}
              >
                <SummarizeIcon></SummarizeIcon>
                <span>Report</span>
              </Link>
              <Link
                to="/ranking"
                className={location.pathname === "/ranking" ? "active" : ""}
                onClick={() => handleLinkClick("/ranking")}
              >
                <LeaderboardIcon></LeaderboardIcon>
                <span>Ranking</span>
              </Link>
              <Link
                to="/questions"
                className={location.pathname === "/questions" ? "active" : ""}
                onClick={() => handleLinkClick("/questions")}
              >
                <QuestionAnswerIcon></QuestionAnswerIcon>
                <span>Question</span>
              </Link>
            </>
          )}
        </ul>

        <Button
          variant="contained"
          sx={{ bgcolor: "#363685" }}
          onClick={() => {
            localStorage.clear();
            setTeacher();
          }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default SideNavBar;
