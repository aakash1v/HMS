import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import StudentDetailsPanel from "./StudentDetailsPanel";
import Slot from "./Slot";
import { fetchFlats } from "@/services/flatsApi";

export default function ShowRooms() {
  const {
    data: flats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["flats"],
    queryFn: fetchFlats,
  });

  const [student, setStudent] = useState(null);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error fetching flats.</p>;

  return (
    <div className="md:flex-row flex-col flex md:h-[90vh] md:overflow-hidden">
      {student ? (
        <div className="md:w-1/3 border-r overflow-y-auto bg-gray-50 shadow">
          <StudentDetailsPanel student={student} />
        </div>
      ) : null}

      <div className={`overflow-y-auto p-6 ${student ? "w-2/3" : "w-3/3" }`}>
        <h1 className="text-2xl font-bold text-center mb-6">Nalanda Hostel</h1>
        <div className="flex flex-wrap gap-4">
          {flats.map((flat, flatIdx) => (
            <div key={flatIdx} className="border rounded shadow p-4 w-72">
              <div className="text-lg font-bold text-center mb-4">
                Flat {flat.flat_no}
              </div>

              <div className="flex flex-col gap-3">
                {flat.rooms.map((room, roomIdx) => (
                  <div key={roomIdx}>
                    <div className="text-sm font-semibold mb-1">
                      Room {room.room_no}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {room.slots.map((slot, slotIdx) => (
                        <Slot
                          setStudent={setStudent}
                          studentId={slot.student}
                          key={slotIdx}
                          student={student}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
