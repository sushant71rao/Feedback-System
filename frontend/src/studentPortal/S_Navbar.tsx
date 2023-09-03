import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/student/S_nav.css";
import React from "react";
const StudentNavbar = () => {
  let { setStudent } = useContext(AuthContext);

  function sidebarDisplay() {
    let sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("widthadd");
  }

  React.useEffect(() => {}, []);

  return (
    <>
      <div className="nav-parent" style={{ gridArea: "nav" }}>
        <nav>
          <div>
            <img src="src\images\FEEDBACK_SYMBOL.jpg" alt="" width={40} />
            <span>FEEDBACK SYSTEM</span>
          </div>
          <span
            onClick={() => {
              sidebarDisplay();
            }}
            className="hamburger-icon"
          >
            <div />
            <div />
            <div />
          </span>
        </nav>
        <div className="sidebar">
          <div className="sidebar-content">
            <Link to="/">
              <h2>Home</h2>
            </Link>
            <Link to="/myaccount">
              <h2>My Account</h2>
            </Link>
            <Link to="/portal">
              <h2>Portal</h2>
            </Link>
            <h2
              onClick={() => {
                localStorage.clear();
                setStudent();
              }}
            >
              Logout
            </h2>
            <p
              id="cross"
              onClick={() => {
                sidebarDisplay();
              }}
            >
              &#10060;
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentNavbar;
