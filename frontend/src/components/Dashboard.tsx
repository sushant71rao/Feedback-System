import React from "react";
import TeacherRoute from "../Routers/TeacherRoute";
import "../styles/teacher/dashboard.css";
import SideNavBar from "./TeacherPortal/SideNavBar";

const Dashboard = () => {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#eeeeee";
  }, []);

  return (
    <div className="Dashboard">
      <SideNavBar></SideNavBar>
      <div className="display">
        <TeacherRoute></TeacherRoute>
      </div>
    </div>
  );
};

export default Dashboard;
