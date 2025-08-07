import { fetchStudents } from "@/services/studentsApi";
import toast from "react-hot-toast";

function Slot({ studentId, setStudent, student }) {
  async function handleSlotClick(studentId) {
    if (!studentId) {
      setStudent(null);
      toast.error('no student found.');
      return;
    }
    if (studentId == student?._id) {
      setStudent(null);
    } else {
      const data = await fetchStudents(studentId);
      setStudent(data);
    }
  }

  const getStatusColor = (student) => {
    return student ? "bg-green-500" : "bg-gray-400";
  };

  return (
    <div
      className={`w-6 h-6 rounded-sm cursor-pointer ${getStatusColor(studentId)}`}
      title={studentId || "Empty"}
      onClick={() => handleSlotClick(studentId)}
    ></div>
  );
}

export default Slot;
