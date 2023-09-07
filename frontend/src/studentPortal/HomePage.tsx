import { Link } from "react-router-dom";
import "../styles/student/HomePage.css";
import ImageInfo from "./ImageInfo";

const HomePage = () => {
  return (
    <main>
      <div className="img-txt">
        <div className="info">
          <h3>AMPLIFY YOUR VOICE WITH FEEDBACK SYSTEM</h3>
          Feedback is one of the most effective teaching and learning techniques
          that puts out a direct impact on both teaching and learning process
          that has an immediate impact on the process of acquiring knowledge
          <Link to="/portal">
            <button className="white-btn">Portal</button>
          </Link>
        </div>
        <img src="/images/feedback_img.jpg" alt="img" />
      </div>
      <div className="full-width">
        <ImageInfo></ImageInfo>
      </div>
    </main>
  );
};

export default HomePage;
