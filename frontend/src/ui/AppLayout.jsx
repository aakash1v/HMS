import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="h-5/6 bg-gray-400 grid">
      <Header />

      <main className="overflow-scroll ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
