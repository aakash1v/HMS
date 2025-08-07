import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { SiGnuprivacyguard } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Header({ showSidebar, setShowSidebar }) {
  return (
    <nav className="flex text-stone-50 justify-between items-center py-3 px-12 bg-gray-800">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black text-white absolute left-0 p-0"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ChevronLeft /> : <ChevronRight />}
      </Button>{" "}
      <Link to="/dashboard">
        <span className="tracking-widest text-3xl font-extralight cursor-pointer">
          HMS
        </span>
      </Link>
      <ul className="flex justify-between items-center gap-5">
        <Link to="/auth/login">
          <LuLogIn className="md:size-5 hover:text-purple-500 text-purple-50" />
        </Link>
        <Link to="/auth/register">
          <SiGnuprivacyguard className="md:size-5 hover:text-purple-500 text-purple-50" />
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
