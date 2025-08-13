import axios from "./axios/djangoApi.js";

export async function markAttendance(studentId) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const payload = {
    student: studentId,
    present: true,
    date: today,
  };

  try {
    const res = await axios.post(`/attendance/`, payload);
    return res.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
}

