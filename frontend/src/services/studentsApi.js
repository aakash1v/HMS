import axios from "./axios/nodeApi.js";
import axios2 from "./axios/djangoApi.js";

export async function fetchStudents(studentId) {
  const res = await axios.get(`/students/${studentId}`);
  return res.data;
}

export async function registerStudent(student) {
  const res = await axios.post(`/students`, student, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function registerStudentDjango(student) {
  const studentData = {
    prn: student.prn,
    branch: student.branch,
    dob: student.dob,
    year: student.year,
    mobile: student.mobile,
    user: {
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      username: student.username,
      password: student.password,
    },
    mongoID: student.mongoID
  };

  const res = await axios2.post(`/students/`, studentData);
  return res.data;
}

export async function deleteStudent(id){
  const res = await axios.delete(`/students/${id}`)
  return res
}

export async function fetchStudentDetails(id){
  const res = await axios.get(`/students/${id}`)
  return res.data


} 


