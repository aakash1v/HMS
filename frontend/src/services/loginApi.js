
import axios from "./axios/djangoApi.js";
import axios2 from "./axios/nodeApi.js";


export async function loginUser(user) {
  const res = await axios.post(`/token/`, user, {
  });
  return res.data;
}

export async function fetchUserDetails(id){
  const res = await axios2.get(`/students/${id}`)
  return res.data


} 

