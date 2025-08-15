import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Sidebar({ toggleSidebar, isMobile }) {
  const { user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Hostel", path: "/hostel" },
    { name: "Attendance", path: "/attendence" },
    { name: "Mark Attendance", path: "/mark-attendence" },
  ];

  function handleClickOnSidebar() {
    if (isMobile) {
      toggleSidebar((is) => !is);
    }
  }
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-950 to-blue-800 w-full min-h-screen p-4 shadow-lg">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-blue-900 font-bold text-xl">
          {user?.first_name?.[0] || "U"}
        </div>
        <h2 className="text-white text-lg font-semibold mt-3 text-center">
          Welcome,{" "}
          <span className="font-bold">{user?.first_name || "User"}</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col w-full gap-3" onClick={handleClickOnSidebar}>
        {navLinks.filter(link => !(user?.role === "admin" && link.name === "Mark Attendance"))
          .map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-5 py-3 rounded-md text-lg font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-white text-blue-900 font-bold shadow-md"
                  : "text-white hover:bg-blue-800 hover:shadow-sm"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
