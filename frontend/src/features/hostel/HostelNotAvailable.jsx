import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// src/features/hostel/HostelNotAvailable.jsx
export default function HostelNotAvailable() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v1m0 4v13h18V8H3zm0-4h18v4H3V3z"
        />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-700">
        Hostel Data Not Available
      </h2>
      <p className="text-gray-500 mt-2">
        Sorry, we couldn’t find the details for this hostel right now.  
        Please check back later.
      </p>
      <Button onClick={()=> navigate(-1)} className="my-2 text-white bg-purple-500 hover:bg-purple-700 cursor-pointer">Back</Button>
    </div>
  );
}

