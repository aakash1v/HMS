import { fetchStudentDetails } from "@/services/studentsApi"

function StudentDetails() {
  const user = fetchStudentDetails("689c5545d32c1928606069c6")
  console.log(user)
  return (
    <div></div>
  )
}

export default StudentDetails
