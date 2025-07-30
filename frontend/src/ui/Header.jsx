import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { SiGnuprivacyguard } from "react-icons/si";

function Header() {
  return (
    <nav className="flex text-stone-50 justify-between items-center py-3 px-8 bg-gray-800">
      <Link to="/dashboard">
        <span className="tracking-widest text-3xl font-extralight cursor-pointer">
          HMS
        </span>
      </Link>
      <ul className="flex justify-between items-center gap-5">
        <Link to="/login">
          <LuLogIn className="md:size-8 hover:text-purple-500 text-purple-50" />
        </Link>
        <Link to="/register">
          <SiGnuprivacyguard className="md:size-8 hover:text-purple-500 text-purple-50" />
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
