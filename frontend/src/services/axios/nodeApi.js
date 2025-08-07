
import axios from "axios";

const nodeApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default nodeApi;
