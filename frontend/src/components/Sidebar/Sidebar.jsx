import {
  GraduationCap,
  LayoutDashboard,
  UserRound,
  CalendarCheck,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  CreditCard,
  Megaphone,
  ClipboardCheck,
  Bell,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar({ onItemClick }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Academics",
      path: "/academics",
      icon: BookOpen,
    },
    {
      name: "Timetable",
      path: "/timetable",
      icon: CalendarDays,
    },
    {
      name: "Assignments",
      path: "/assignments",
      icon: ClipboardList,
    },
    {
      name: "Examinations",
      path: "/examinations",
      icon: FileText,
    },
    {
      name: "Fees",
      path: "/fees",
      icon: CreditCard,
    },
    {
      name: "Announcements",
      path: "/announcements",
      icon: Megaphone,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: ClipboardCheck,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
  ];


  /* ========================================
     Logout
  ======================================== */

  const handleLogout = () => {
    /*
      Backend authentication integration:

      Later Java backend + JWT connect chesinappudu
      actual authentication data ikkada clear chestham.
    */

    localStorage.removeItem("token");
    localStorage.removeItem("student");
    localStorage.removeItem("studentProfileImage");

    // Mobile lo sidebar close
    if (onItemClick) {
      onItemClick();
    }

    navigate("/login", {
      replace: true,
    });
  };


  return (
    <aside className="sidebar">

      {/* ========================================
          Logo
      ======================================== */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          <GraduationCap size={28} />
        </div>

        <span>
          Student ERP
        </span>

      </div>


      {/* ========================================
          Navigation
      ======================================== */}

      <nav className="sidebar-nav">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}

              /*
                Mobile lo menu item click ayyaka
                sidebar automatically close avutundi.
              */
              onClick={onItemClick}

              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >

              <Icon size={20} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );

        })}

      </nav>


      {/* ========================================
          Bottom Section
      ======================================== */}

      <div className="sidebar-bottom">

        {/* Promotional Card */}

        <div className="sidebar-promo">

          <div className="sidebar-promo-content">

            <strong>
              Stay Organized,
            </strong>

            <span>
              Stay Ahead!
            </span>

          </div>

          <Sparkles size={17} />

        </div>


        {/* ========================================
            Settings
        ======================================== */}

        <NavLink
          to="/settings"

          /*
            Mobile lo Settings click ayyaka
            sidebar close avutundi.
          */
          onClick={onItemClick}

          className={({ isActive }) =>
            `sidebar-item sidebar-bottom-item ${
              isActive ? "active" : ""
            }`
          }
        >

          <Settings size={20} />

          <span>
            Settings
          </span>

        </NavLink>


        {/* ========================================
            Logout
        ======================================== */}

        <button
          type="button"
          className="sidebar-item sidebar-logout"
          onClick={handleLogout}
        >

          <LogOut size={20} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;