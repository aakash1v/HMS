import axios from "./axios/nodeApi.js";

const fetchFlats = async () => {
  const res = await axios.get("/flats");
  return res.data;
};

export { fetchFlats };
