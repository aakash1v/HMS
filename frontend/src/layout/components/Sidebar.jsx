import { Link } from "react-router-dom";
import "./Siderbar.css";
import { useAuth } from "@/context/AuthContext";

const ListClass =
  "text-xl hover:text-gray-900 font-extralight hover:bg-gray-300 px-5 py-2 rounded-sm mb-3 text-gray-50 bg-gray-800";

function Sidebar() {
  const { user} = useAuth();
  return (
    <div className="flex flex-col items-center bg-blue-900 w-full">
      <h2 className="text-center md:text-3xl text-stone-50 mb-3 md:my-10 font-extrabold text-xl">
        <div className="flex md:flex-col">
          <span>Welcome, </span>
          <span>{user?.first_name} </span>
        </div>
      </h2>
      <ul className="flex flex-col items-center justify-start h-full w-full p-1 md:p-8">
        <li>
          <Link to="/" className={ListClass}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className={ListClass}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/hostel" className={ListClass}>
            Hostel
          </Link>
        </li>
        <li>
          <Link to="/attendence" className={ListClass}>
            Attendence
          </Link>
        </li>
        <li>
          <Link to="/mark-attendence" className={ListClass}>
            Mark Attendance
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
