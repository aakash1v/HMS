import { fetchFlats } from "@/services/flatsApi";
import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalSlots: 0,
    occupiedSlots: 0,
    emptySlots: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const flats = await fetchFlats();

        let roomCount = 0;
        let slotCount = 0;
        let occupiedCount = 0;

        flats.forEach((flat) => {
          flat.rooms.forEach((room) => {
            roomCount += 1;
            room.slots.forEach((slot) => {
              slotCount += 1;
              if (slot.student) {
                occupiedCount += 1;
              }
            });
          });
        });

        setStats({
          totalRooms: roomCount,
          totalSlots: slotCount,
          occupiedSlots: occupiedCount,
          emptySlots: slotCount - occupiedCount,
        });
      } catch (err) {
        console.error("Failed to fetch flats:", err);
      }
    };

    getStats();
  }, []);

  return (
    <div>
      <h1 className="text-center text-purple-600 text-4xl my-5">Stats</h1>
      <div className="flex m-5 bg-gray-200 rounded-lg p-4 gap-1 md:gap-4">
        <div className="w-1/4 bg-white md:p-4 rounded shadow text-center">
          <h2 className="md:text-xl font-bold">Total Rooms</h2>
          <p className="md:text-2xl">{stats.totalRooms}</p>
        </div>
        <div className="w-1/4 bg-white md:p-4 rounded shadow text-center">
          <h2 className="md:text-xl font-bold">Total Slots</h2>
          <p className="md:text-2xl">{stats.totalSlots}</p>
        </div>
        <div className="w-1/4 bg-green-100 md:p-4 rounded shadow text-center">
          <h2 className="md:text-xl font-bold">Occupied</h2>
          <p className="md:text-2xl">{stats.occupiedSlots}</p>
        </div>
        <div className="w-1/4 bg-red-100 md:p-4 rounded shadow text-center">
          <h2 className="md:text-xl font-bold">Empty</h2>
          <p className="md:text-2xl">{stats.emptySlots}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

