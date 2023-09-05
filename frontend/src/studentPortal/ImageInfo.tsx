interface image {
  text: string;
  name: string;
  url: string;
  id: number;
}
type imgArr = [image];
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import {
  useEffect,
  useState,
  //  useState
} from "react";

// y
const ImageInfo = () => {
  let [ImgData, setData] = useState<imgArr>();
  let fetchfn = async () => {
    let res = await axios.get("images.json");
    setData(res.data);
  };
  useEffect(() => {
    fetchfn();
    AOS.init();
  }, []);
  return (
    <>
      <div className="center">
        <h4>HERE’S WHAT PEOPLE SAY ABOUT FEEDBACKS</h4>
        <div className="imginfo">
          {ImgData?.map((ele, index: number) => (
            <div key={index} className="testimonials" data-aos={"fade-right"}>
              <img src={ele.url} key={ele.id} alt="Image1" width={150} />
              <div className="flex">
                <div key={index}>{ele.text}</div>
                <div className="name">{ele.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageInfo;
