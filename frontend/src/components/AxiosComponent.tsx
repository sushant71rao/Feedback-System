import axios from "axios";

let AxiosInstance = axios.create({
  baseURL: " http://localhost:5000/api",
  withCredentials: true,
});

export default AxiosInstance;
