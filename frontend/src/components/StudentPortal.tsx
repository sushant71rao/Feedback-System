import StudentNavbar from "../studentPortal/S_Navbar";
import StudentRouter from "../Routers/StudentRouter";

const StudentPortal = () => {
  

  return (
    <div className="student-body">
      <StudentNavbar></StudentNavbar>
      <div>
        <StudentRouter />
      </div>
    </div>
  );
};

export default StudentPortal;
