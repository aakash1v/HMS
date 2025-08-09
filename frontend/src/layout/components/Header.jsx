import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function Header({ showSidebar, setShowSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  function handleLogout() {
    logout();
    navigate("/auth/login")
  }

  return (
    <nav className="flex text-stone-50 justify-between items-center py-3 px-12 bg-gray-800">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black text-white absolute left-0 p-0 cursor-pointer hover:bg-purple-500"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      <Link to="/dashboard">
        <span className="tracking-widest text-3xl font-extralight cursor-pointer">
          HMS
        </span>
      </Link>

      <ul className="flex justify-between items-center gap-5">
        {!user ? (
          <>
            <Link to="/auth/login" title="Login">
              <LogIn className="md:size-6 hover:text-purple-500 transition-colors" />
            </Link>
            <Link to="/auth/register" title="Sign Up">
              <UserPlus className="md:size-6 hover:text-purple-500 transition-colors" />
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} title="Logout">
            <LogOut className="md:size-6 hover:text-red-500 transition-colors cursor-pointer" />
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Header;
