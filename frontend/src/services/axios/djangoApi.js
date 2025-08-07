
import axios from "axios";

const djangoApi = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // only if you're using cookies
});

export default djangoApi;
