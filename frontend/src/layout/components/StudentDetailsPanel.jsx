export default function StudentDetailsPanel({ student }) {
  if (!student) {
    return (
      <div className="p-4 text-gray-500">
        Click on a filled slot to view student details.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-2">
      <h2 className="text-xl font-bold">Student Details</h2>
      <p>
        <strong>Name:</strong> {student.first_name } {student.last_name}
      </p>
      <p>
        <strong>PRN:</strong> {student.prn}
      </p>
      <p>
        <strong>Branch:</strong> {student.branch}
      </p>
      <p>
        <strong>Year:</strong> {student.year}
      </p>
      <p>
        <strong>Email:</strong> {student.email || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {student.mobile || "N/A"}
      </p>
      {/* Add more fields as needed */}
    </div>
  );
}
