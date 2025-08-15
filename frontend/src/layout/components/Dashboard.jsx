import { fetchFlats } from "@/services/flatsApi";
import { fetchAttendance } from "@/services/attendenceApi";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalSlots: 0,
    occupiedSlots: 0,
    emptySlots: 0,
    flatsData: [],
  });

  const [attendanceStats, setAttendanceStats] = useState({
    totalToday: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        // ----- ROOM/OCCUPANCY STATS -----
        const flats = await fetchFlats();

        let roomCount = 0;
        let slotCount = 0;
        let occupiedCount = 0;
        let flatsData = [];

        flats.forEach((flat) => {
          let flatRoomCount = 0;
          let flatOccupied = 0;

          flat.rooms.forEach((room) => {
            roomCount += 1;
            flatRoomCount += 1;
            room.slots.forEach((slot) => {
              slotCount += 1;
              if (slot.student) {
                occupiedCount += 1;
                flatOccupied += 1;
              }
            });
          });

          flatsData.push({
            name: flat.name,
            rooms: flatRoomCount,
            occupied: flatOccupied,
            empty: flatRoomCount * (flat.rooms[0]?.slots.length || 0) - flatOccupied,
          });
        });

        setStats({
          totalRooms: roomCount,
          totalSlots: slotCount,
          occupiedSlots: occupiedCount,
          emptySlots: slotCount - occupiedCount,
          flatsData,
        });

        // ----- ATTENDANCE STATS -----
        const attendance = await fetchAttendance();
        const today = new Date().toISOString().split("T")[0];

        const todayRecords = attendance.filter(a => a.date === today);
        const presentCount = todayRecords.filter(a => a.present).length;
        const absentCount = todayRecords.length - presentCount;

        setAttendanceStats({
          totalToday: todayRecords.length,
          present: presentCount,
          absent: absentCount,
          percentage: todayRecords.length > 0
            ? ((presentCount / todayRecords.length) * 100).toFixed(1)
            : 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    getStats();
  }, []);

  const COLORS = ["#22c55e", "#ef4444"]; // green for positive, red for negative

  const pieData = [
    { name: "Occupied", value: stats.occupiedSlots },
    { name: "Empty", value: stats.emptySlots },
  ];

  const attendancePieData = [
    { name: "Present", value: attendanceStats.present },
    { name: "Absent", value: attendanceStats.absent },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-center text-purple-600 text-4xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Rooms" value={stats.totalRooms} color="bg-blue-100" />
        <StatCard title="Total Slots" value={stats.totalSlots} color="bg-yellow-100" />
        <StatCard title="Occupied Slots" value={stats.occupiedSlots} color="bg-green-100" />
        <StatCard title="Empty Slots" value={stats.emptySlots} color="bg-red-100" />
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Attendance Today" value={attendanceStats.totalToday} color="bg-gray-100" />
        <StatCard title="Present" value={attendanceStats.present} color="bg-green-100" />
        <StatCard title="Absent" value={attendanceStats.absent} color="bg-red-100" />
        <StatCard title="Attendance %" value={`${attendanceStats.percentage}%`} color="bg-blue-100" />
      </div>

      {/* Occupancy Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Occupancy Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Attendance Today</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={attendancePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {attendancePieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Rooms & Occupancy by Flat</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.flatsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupied" fill="#22c55e" />
            <Bar dataKey="empty" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg shadow ${color}`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;

