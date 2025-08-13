
import axios from "axios";

const djangoApi = axios.create({
  baseURL:import.meta.env.VITE_API_URL2 ,
  withCredentials: true, // only if you're using cookies
});

export default djangoApi;
