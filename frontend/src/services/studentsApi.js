import axios from "./axios/nodeApi.js";
import axios2 from "./axios/djangoApi.js"

export async function fetchStudents(studentId) {
  const res = await axios.get(`/students/${studentId}`);
  return res.data;
}

export async function registerStudent(student) {
  const res = await axios.post(`/students`, student);
  return res.data;
}

export async function registerStudentDjango(student) {
  const studentData = {
    prn: student.prn,
    branch: student.branch,
    dob: student.dob.split("T")[0],  // Just the date part
    year: student.year,
    mobile: student.phone,
    user: {
      username: student.email,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      is_student: true
    }
  };

  const res = await axios2.post(`/students/register/`, studentData);
  return res.data;
}

