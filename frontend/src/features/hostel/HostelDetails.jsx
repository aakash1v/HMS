
// src/features/hostel/HostelDetails.jsx
import { useParams } from "react-router-dom";
import ShowRooms from "@/layout/components/ShowRooms";
import HostelNotAvailable from "./HostelNotAvailable";

export default function HostelDetails() {
  const { hostelId } = useParams();

  if(hostelId !== "h1") return <HostelNotAvailable/>

  return (
      <ShowRooms hostelId={hostelId} />
  );
}
