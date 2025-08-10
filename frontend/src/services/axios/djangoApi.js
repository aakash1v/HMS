
import axios from "axios";

const djangoApi = axios.create({
  baseURL: "https://api.project1.space/api/",
  withCredentials: true, // only if you're using cookies
});

export default djangoApi;
