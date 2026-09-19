import {
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  Camera,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import api from "../../services/api";

function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const profileImageInputRef = useRef(null);

  // ========================================
  // Logged-in Student
  // ========================================

  const [student, setStudent] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("student")
      );
    } catch (error) {
      return null;
    }
  });

  // ========================================
  // Profile Image
  // ========================================

  const [profileImage, setProfileImage] = useState(() => {
    try {
      const storedStudent =
        JSON.parse(localStorage.getItem("student"));

      if (!storedStudent?.studentId) {
        return "";
      }

      return (
        localStorage.getItem(
          `studentProfileImage_${storedStudent.studentId}`
        ) || ""
      );
    } catch (error) {
      return "";
    }
  });

  // ========================================
  // Load Student Details
  // ========================================

  useEffect(() => {
    const storedStudent =
      localStorage.getItem("student");

    if (!storedStudent) {
      return;
    }

    try {
      setStudent(JSON.parse(storedStudent));
    } catch (error) {
      console.error(
        "Failed to load student details:",
        error
      );
    }
  }, []);

  // ========================================
  // Notification Count
  // ========================================

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const storedStudent =
          JSON.parse(
            localStorage.getItem("student")
          );

        if (!storedStudent?.studentId) {
          return;
        }

        const response = await api.get(
          `/notifications/${storedStudent.studentId}`
        );

        setNotificationCount(
          response.data.length
        );
      } catch (error) {
        console.error(
          "Failed to load notification count:",
          error
        );
      }
    };

    fetchNotificationCount();
  }, []);

  // ========================================
  // Profile Image Change
  // ========================================

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      // Immediately show image
      setProfileImage(imageData);

      // Get logged-in student
      const storedStudent =
        JSON.parse(localStorage.getItem("student"));

      // Save image separately for each student
      if (storedStudent?.studentId) {
        localStorage.setItem(
          `studentProfileImage_${storedStudent.studentId}`,
          imageData
        );
      }
    };

    reader.readAsDataURL(file);

    // Close dropdown
    setProfileOpen(false);
  };

  // ========================================
  // Logout
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    setProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  // ========================================
  // Student Display Details
  // ========================================

  const studentName =
    student?.name || "Student";

  const studentId =
    student?.studentId || "Student ID";

  const studentInitials =
    studentName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase() || "ST";

  return (
    <header className="navbar">

      {/* ========================================
          Left Section
      ======================================== */}

      <div className="navbar-left">

        <button
          type="button"
          className="menu-button"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

      </div>


      {/* ========================================
          Right Section
      ======================================== */}

      <div className="navbar-right">

        {/* Notifications */}

        <button
          type="button"
          className="navbar-icon-button notification-button"
          onClick={() =>
            navigate("/notifications")
          }
          aria-label="Notifications"
        >
          <Bell size={22} />

          <span className="notification-badge">
            {notificationCount}
          </span>
        </button>


        {/* Messages */}

        <button
          type="button"
          className="navbar-icon-button"
          onClick={() =>
            navigate("/messages")
          }
          aria-label="Messages"
        >
          <MessageSquare size={21} />
        </button>


        <div className="navbar-divider"></div>


        {/* ========================================
            Student Profile
        ======================================== */}

        <div className="navbar-profile-wrapper">

          <button
            type="button"
            className={`navbar-profile ${
              profileOpen
                ? "profile-open"
                : ""
            }`}
            onClick={() =>
              setProfileOpen(
                (previous) => !previous
              )
            }
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >

            {/* Profile Image */}

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-avatar profile-image"
              />
            ) : (
              <div className="profile-avatar">
                {studentInitials}
              </div>
            )}


            {/* Profile Info */}

            <div className="profile-info">

              <span className="profile-name">
                {studentName}
              </span>

              <span className="profile-id">
                {studentId}
              </span>

            </div>


            <ChevronDown
              size={17}
              className={`profile-chevron ${
                profileOpen
                  ? "rotate"
                  : ""
              }`}
            />

          </button>


          {/* ========================================
              Profile Dropdown
          ======================================== */}

          {profileOpen && (

            <div className="profile-dropdown">

              <div className="profile-dropdown-header">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-dropdown-avatar profile-image"
                  />
                ) : (
                  <div className="profile-dropdown-avatar">
                    {studentInitials}
                  </div>
                )}

                <div className="profile-dropdown-info">

                  <h4>
                    {studentName}
                  </h4>

                  <p>
                    {studentId}
                  </p>

                </div>

              </div>


              <div className="profile-dropdown-divider"></div>


              {/* Change Profile Image */}

              <button
                type="button"
                className="profile-dropdown-item"
                onClick={() => {
                  profileImageInputRef.current?.click();
                }}
              >

                <Camera size={18} />

                <span>
                  Change Profile Image
                </span>

              </button>


              {/* Settings */}

              <button
                type="button"
                className="profile-dropdown-item"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/settings");
                }}
              >

                <Settings size={18} />

                <span>
                  Settings
                </span>

              </button>


              {/* Logout */}

              <button
                type="button"
                className="profile-dropdown-item logout-item"
                onClick={handleLogout}
              >

                <LogOut size={18} />

                <span>
                  Logout
                </span>

              </button>


              {/* Hidden File Input */}

              <input
                ref={profileImageInputRef}
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                hidden
              />

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;