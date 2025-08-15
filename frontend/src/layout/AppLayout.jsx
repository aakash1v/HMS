import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Tailwind "md" breakpoint
    
    checkMobile(); // Run on first load
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen md:grid md:grid-cols-15">
      {/* Sidebar for large screens */}
      {showSidebar && (
        <aside className="md:flex col-span-3">
          <Sidebar toggleSidebar={setShowSidebar} isMobile={isMobile}/>
        </aside>
      )}

      <main
        className={`grid grid-rows-[50px_1fr_auto] overflow-auto relative ${showSidebar ? 'col-span-12' : 'col-span-15' }`}
      >
        <Header setShowSidebar={setShowSidebar}  showSidebar={showSidebar}/>
          <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
