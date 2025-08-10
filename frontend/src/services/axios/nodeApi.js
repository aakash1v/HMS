
import axios from "axios";

const nodeApi = axios.create({
  baseURL: "https://node.project1.space/api/",
  withCredentials: true,
});

export default nodeApi;
