import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./DashboardLayout.css";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ========================================
     Mobile Sidebar State
  ======================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  /* ========================================
     Toggle Sidebar
  ======================================== */

  const handleMenuToggle = () => {
    setSidebarOpen((previous) => !previous);
  };


  /* ========================================
     Close Sidebar
  ======================================== */

  const handleCloseSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };


  return (
    <div
      className={`dashboard-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >

      {/* ========================================
          Sidebar
      ======================================== */}

      <Sidebar onItemClick={handleCloseSidebar} />


      {/* ========================================
          Mobile Overlay
      ======================================== */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}


      {/* ========================================
          Main Area
      ======================================== */}

      <div className="dashboard-main">

        {/* Navbar */}

        <Navbar
          onMenuToggle={handleMenuToggle}
        />


        {/* Page Content */}

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;