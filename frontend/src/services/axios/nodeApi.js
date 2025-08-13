
import axios from "axios";

const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL1,
  withCredentials: true,
});

export default nodeApi;
