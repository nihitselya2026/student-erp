import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import SignupVerifyOtp from "../pages/SignupVerifyOtp/SignupVerifyOtp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Attendance from "../pages/Attendance/Attendance";
import Academics from "../pages/Academics/Academics";
import Timetable from "../pages/Timetable/Timetable";
import Assignments from "../pages/Assignments/Assignments";
import Examinations from "../pages/Examinations/Examinations";
import Fees from "../pages/Fees/Fees";
import Announcements from "../pages/Announcements/Announcements";
import Leave from "../pages/Leave/Leave";
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages/Messages";
import Settings from "../pages/Settings/Settings";


/* ========================================
   Protected Route
======================================== */

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* ========================================
   App Routes
======================================== */

function AppRoutes() {
  return (
    <Routes>

      {/* ========================================
          Login
      ======================================== */}

      <Route
        path="/login"
        element={<Login />}
      />
     <Route path="/signup" element={<Signup />} />
     <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
    <Route
  path="/signup-verify-otp"
  element={<SignupVerifyOtp />}
/>
<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      {/* ========================================
          Student ERP - Protected Routes
      ======================================== */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Attendance */}

        <Route
          path="/attendance"
          element={<Attendance />}
        />


        {/* Academics */}

        <Route
          path="/academics"
          element={<Academics />}
        />


        {/* Timetable */}

        <Route
          path="/timetable"
          element={<Timetable />}
        />


        {/* Assignments */}

        <Route
          path="/assignments"
          element={<Assignments />}
        />


        {/* Examinations */}

        <Route
          path="/examinations"
          element={<Examinations />}
        />


        {/* Fees */}

        <Route
          path="/fees"
          element={<Fees />}
        />


        {/* Announcements */}

        <Route
          path="/announcements"
          element={<Announcements />}
        />


        {/* Leave */}

        <Route
          path="/leave"
          element={<Leave />}
        />


        {/* Notifications */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Messages */}

<Route
  path="/messages"
  element={<Messages />}
/>


        {/* Settings */}

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>


      {/* ========================================
          Unknown Route
      ======================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;