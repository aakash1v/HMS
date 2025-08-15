import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { selectSlot } from "@/services/flatsApi";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function SelectSlot() {
  const [flatId, setFlatId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [slotNumber, setSlotNumber] = useState("");

  const studentId = JSON.parse(localStorage.getItem("user"))?._id;

  async function handleSelectSlot() {
    if (!flatId || !roomId || !slotNumber || !studentId) {
      toast.error("Please fill all fields before selecting a slot");
      return;
    }

    try {
      const res = await selectSlot(flatId, roomId, slotNumber, studentId);
      console.log(res);
      toast.success("Slot selected successfully!");
      setFlatId("");
      setRoomId("");
      setSlotNumber("");
    } catch (error) {
      console.error("Error selecting slot:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Select Your Slot / Hostel / Room
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Flat ID
          </label>
          <Input
            value={flatId}
            onChange={(e) => setFlatId(e.target.value)}
            placeholder="e.g., SQ202"
            className="focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Room ID
          </label>
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="e.g., R1"
            className="focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Slot Number
          </label>
          <Input
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
            placeholder="e.g., 1"
            className="focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <Button
          onClick={handleSelectSlot}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Select Slot
        </Button>
      </CardContent>
    </Card>
  );
}

