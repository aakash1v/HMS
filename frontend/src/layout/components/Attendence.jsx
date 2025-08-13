import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import djangoApi from "@/services/axios/djangoApi";

function Attendance() {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await djangoApi.get("/attendance/");
        setAttendanceData(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading attendance...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (attendanceData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Attendance Data Not Available
        </h2>
        <p className="text-gray-500 mt-2">
          No attendance records found.
        </p>
        <Button
          onClick={() => navigate(-1)}
          className="my-2 text-white bg-purple-500 hover:bg-purple-700 cursor-pointer"
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Student</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Present</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.student.prn}</td>
              <td className="border border-gray-300 p-2">
                {item.student.prn || item.student}
              </td>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">
                {item.present ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => navigate(-1)}
        className="mt-4 text-white bg-purple-500 hover:bg-purple-700 cursor-pointer"
      >
        Back
      </Button>
    </div>
  );
}

export default Attendance;

