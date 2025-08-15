import axios from "./axios/djangoApi.js";

// ✅ Fetch all attendance records
export async function fetchAttendance() {
  try {
    const res = await axios.get("/attendance/");
    return res.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

// ✅ Mark attendance for a student
export async function markAttendance(studentId) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

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

