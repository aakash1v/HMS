import axios from "./axios/nodeApi.js";

const fetchFlats = async () => {
  const res = await axios.get("nalanda/flats");
  return res.data;
};

export async function selectSlot(flatId, roomId, slotNumber, studentId) {
  const res = await axios.put(
    `/flats/${flatId}/rooms/${roomId}/slots/${slotNumber}`,
    { studentId }, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}

export { fetchFlats };
