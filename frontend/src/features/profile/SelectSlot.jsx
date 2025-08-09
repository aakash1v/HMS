
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { selectSlot } from "@/services/flatsApi";

export default function SelectSlot() {
  const [flatId, setFlatId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [slotNumber, setSlotNumber] = useState("");

  const studentId = JSON.parse(localStorage.getItem("user"))?._id;

  async function handleSelectSlot() {
    console.log(studentId)
    if (!flatId || !roomId || !slotNumber || !studentId) {
      toast.error("Please fill all fields before selecting a slot");
      return;
    }

    try {
      const res = await selectSlot(flatId, roomId, slotNumber, studentId);
      console.log(res)

      toast.success("Slot selected successfully!");
    } catch (error) {
      console.error("Error selecting slot:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col items-center border-black border-1 rounded-xl h-3/6 p-5 space-y-4">
      <h1 className="text-2xl font-semibold">
        Select Your Slot / Hostel / Room
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Flat ID</label>
          <Input
            value={flatId}
            onChange={(e) => setFlatId(e.target.value)}
            placeholder="e.g., SQ202"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Room ID</label>
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="e.g., R1"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Slot Number</label>
          <Input
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
            placeholder="e.g., 1"
          />
        </div>
      </div>

      <Button
        onClick={handleSelectSlot}
        className="bg-purple-500 hover:bg-purple-700"
      >
        Select Slot
      </Button>
    </div>
  );
}
