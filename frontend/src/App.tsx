import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import StudentPortal from "./components/StudentPortal";
import Dashboard from "./components/Dashboard";

function App() {
  let { teacher, student, setUser } = useContext(AuthContext);
  return (
    <>
      {!teacher && !student && !setUser() ? (
        <LoginPage />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {student && <StudentPortal></StudentPortal>}
          {teacher && <Dashboard></Dashboard>}
        </div>
      )}
    </>
  );
}

export default App;
