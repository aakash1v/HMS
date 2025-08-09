import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="min-h-screen md:grid md:grid-cols-15">
      {/* Sidebar for large screens */}
      {showSidebar && (
        <aside className="md:flex col-span-3">
          <Sidebar />
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
