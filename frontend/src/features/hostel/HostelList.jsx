// src/features/hostel/HostelList.jsx
import { useNavigate } from "react-router-dom";

const hostels = [
  { id: "h1", name: "Nalanda Hostel" },
  { id: "h2", name: "Patliaputra Hostel" },
  { id: "h3", name: "B4" },
  { id: "h4", name: "B5" },
];

export default function HostelList() {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {hostels.map((hostel) => (
        <div
          key={hostel.id}
          onClick={() => navigate(`/hostel/${hostel.id}`)}
          className="cursor-pointer p-6 rounded-xl border border-gray-200 shadow-sm 
                     hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-blue-950"
        >
          <h2 className="text-xl font-bold text-blue-200">{hostel.name}</h2>
          <p className="text-sm text-blue-50 mt-2">
            Click to view rooms and details
          </p>
        </div>
      ))}
    </div>
  );
}

