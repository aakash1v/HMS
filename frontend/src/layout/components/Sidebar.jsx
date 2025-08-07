import { Link } from "react-router-dom";
import "./Siderbar.css";

const ListClass =
  "text-xl hover:text-gray-900 font-extralight hover:bg-gray-300 px-5 py-2 rounded-sm mb-3 text-gray-50 bg-gray-800";

function Sidebar() {
  return (
    <div className="flex flex-col items-center bg-blue-900 w-full">
      <h2 className="text-center text-3xl text-stone-50 my-10 font-extrabold">
        <p>Welcome ,</p>
        <p>User </p>
      </h2>
      <ul className="flex flex-col items-center justify-start h-full w-full p-5">
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
      </ul>
    </div>
  );
}

export default Sidebar;
