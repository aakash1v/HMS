import { Button } from "@/components/ui/button";
import { markAttendance } from "@/services/attendenceApi";
import toast from "react-hot-toast";

function MarkAttendance() {

  const handleMark = async () => {
    try {
      const response = await markAttendance(3); // student ID from logged-in user
      toast.success("Attendance marked successfully..!")
      console.log("Backend Response:", response);
    } catch (error) {
      toast.error("Attendance already done")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-purple-700">
        Mark Attendance
      </h1>

      {/* Subtitle */}
      <p className="mb-6 text-gray-600 text-center">
        Click the button below to mark your attendance for today.
      </p>

      {/* Button */}
      <Button
        onClick={handleMark}
        className="my-2 text-white bg-purple-500 hover:bg-purple-700 cursor-pointer px-6 py-3 text-lg"
      >
        Present
      </Button>
    </div>
  );
}

export default MarkAttendance;

