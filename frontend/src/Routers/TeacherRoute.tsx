import { Routes, Route } from "react-router-dom";

import Personal from "../components/TeacherPortal/Personal";
import MyAcc from "../components/TeacherPortal/MyAcc";
import SessionExpire from "../components/SessionExpire";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Teacher from "../components/TeacherPortal/Teacher";
import ClassManage from "../components/TeacherPortal/Class";
import Session from "../components/TeacherPortal/Session";
import Table from "../components/TeacherPortal/Student";
import ActionComponent from "../components/TeacherPortal/ActionComponent";
import ReportGenerate from "../components/TeacherPortal/ReportGenerate";
import Ranking from "../components/TeacherPortal/Ranking";
import Questions from "../components/TeacherPortal/Questions";

const TeacherRoute = () => {
  let { teacher } = useContext(AuthContext);
  return (
    <>
      {teacher?.Role == "Teacher" && (
        <Routes>
          <Route path="/" element={<Personal></Personal>}></Route>
          <Route path="/myaccount" Component={MyAcc}></Route>
          <Route path="*" Component={SessionExpire}></Route>
        </Routes>
      )}
      {teacher?.Role == "Admin" && (
        <Routes>
          <Route path="/" element={<Personal></Personal>}></Route>
          <Route path="/myaccount" Component={MyAcc}></Route>
          <Route path="/students" Component={Table}></Route>
          <Route path="/teachers" Component={Teacher}></Route>
          <Route path="/class" Component={ClassManage}></Route>
          <Route path="/edit" Component={ActionComponent}></Route>
          <Route path="/session" Component={Session}></Route>
          <Route path="*" Component={SessionExpire}></Route>
          <Route path="/report" Component={ReportGenerate}></Route>
          <Route path="/ranking" Component={Ranking}></Route>
          <Route path="/questions" Component={Questions}></Route>
        </Routes>
      )}
    </>
  );
};

export default TeacherRoute;
