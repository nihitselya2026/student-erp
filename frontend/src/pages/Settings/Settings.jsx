import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Settings as SettingsIcon,
  LockKeyhole,
  Bell,
  Palette,
  ShieldCheck,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

import "./Settings.css";


function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    academic: true,
    assignments: true,
    exams: true,
    fees: true,
  });
  useEffect(() => {
  const fetchSettings = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student?.studentId) {
        return;
      }

      const response = await api.get(
        `/settings/${student.studentId}`
      );

      const settings = response.data;

      setNotifications({
        academic: settings.academicNotifications ?? true,
        assignments: settings.assignmentNotifications ?? true,
        exams: settings.examNotifications ?? true,
        fees: settings.feeNotifications ?? true,
      });
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error("Failed to load notification settings:", error);
      }
    }
  };

  fetchSettings();
}, []);

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNotificationChange = async (name) => {
  try {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student?.studentId) {
      alert("Student information not found.");
      return;
    }

    const updatedNotifications = {
      ...notifications,
      [name]: !notifications[name],
    };

    setNotifications(updatedNotifications);

    await api.put(`/settings/${student.studentId}`, {
      academicNotifications: updatedNotifications.academic,
      assignmentNotifications: updatedNotifications.assignments,
      examNotifications: updatedNotifications.exams,
      feeNotifications: updatedNotifications.fees,
    });

    console.log("Notification settings saved.");
  } catch (error) {
    console.error("Failed to save notification settings:", error);
    alert("Failed to save notification settings.");
  }
};

  const handlePasswordSubmit = async (event) => {
  event.preventDefault();

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  try {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student?.studentId) {
      alert("Student information not found.");
      return;
    }

    await api.put("/auth/change-password", {
      studentId: student.studentId,
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    alert("Password updated successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    console.error("Failed to change password:", error);

    alert(
      error.response?.data ||
        "Failed to update password. Please check your current password."
    );
  }
};

  return (
    <div className="settings-page">

      {/* ========================================
          Header
      ======================================== */}

      <div className="settings-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your account and notification preferences.
          </p>
        </div>

      </div>


      {/* ========================================
          Settings Layout
      ======================================== */}

      <div className="settings-grid">

        {/* ========================================
            Change Password
        ======================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon password-icon">
              <LockKeyhole size={19} />
            </div>

            <div>
              <h3>Change Password</h3>

              <p>
                Update your account password.
              </p>
            </div>

          </div>


          <form
            className="settings-form"
            onSubmit={handlePasswordSubmit}
          >

            {/* Current Password */}

            <div className="settings-form-group">

              <label htmlFor="currentPassword">
                Current Password
                <span>*</span>
              </label>

              <div className="password-input-wrapper">

                <input
                  id="currentPassword"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label="Toggle current password"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>


            {/* New Password */}

            <div className="settings-form-group">

              <label htmlFor="newPassword">
                New Password
                <span>*</span>
              </label>

              <div className="password-input-wrapper">

                <input
                  id="newPassword"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label="Toggle new password"
                >
                  {showNewPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div className="settings-form-group">

              <label htmlFor="confirmPassword">
                Confirm New Password
                <span>*</span>
              </label>

              <div className="password-input-wrapper">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label="Toggle confirm password"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>


            <button
              type="submit"
              className="settings-save-button"
            >
              <Save size={15} />
              Update Password
            </button>

          </form>

        </section>


        {/* ========================================
            Notification Preferences
        ======================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon notification-settings-icon">
              <Bell size={19} />
            </div>

            <div>
              <h3>Notification Preferences</h3>

              <p>
                Choose which notifications you receive.
              </p>
            </div>

          </div>


          <div className="notification-settings-list">

            {/* Academic */}

            <div className="notification-setting-item">

              <div className="notification-setting-info">

                <div className="notification-setting-small-icon">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <h4>Academic Updates</h4>

                  <p>
                    Results, attendance and academic updates.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className={
                  notifications.academic
                    ? "settings-toggle active"
                    : "settings-toggle"
                }
                onClick={() =>
                  handleNotificationChange("academic")
                }
                aria-label="Toggle academic notifications"
              >
                <span></span>
              </button>

            </div>


            {/* Assignments */}

            <div className="notification-setting-item">

              <div className="notification-setting-info">

                <div className="notification-setting-small-icon">
                  <SettingsIcon size={16} />
                </div>

                <div>
                  <h4>Assignment Reminders</h4>

                  <p>
                    Reminders about pending assignments.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className={
                  notifications.assignments
                    ? "settings-toggle active"
                    : "settings-toggle"
                }
                onClick={() =>
                  handleNotificationChange("assignments")
                }
                aria-label="Toggle assignment notifications"
              >
                <span></span>
              </button>

            </div>


            {/* Exams */}

            <div className="notification-setting-item">

              <div className="notification-setting-info">

                <div className="notification-setting-small-icon">
                  <Bell size={16} />
                </div>

                <div>
                  <h4>Exam Alerts</h4>

                  <p>
                    Exam schedules and result updates.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className={
                  notifications.exams
                    ? "settings-toggle active"
                    : "settings-toggle"
                }
                onClick={() =>
                  handleNotificationChange("exams")
                }
                aria-label="Toggle exam notifications"
              >
                <span></span>
              </button>

            </div>


            {/* Fees */}

            <div className="notification-setting-item">

              <div className="notification-setting-info">

                <div className="notification-setting-small-icon">
                  <Bell size={16} />
                </div>

                <div>
                  <h4>Fee Alerts</h4>

                  <p>
                    Pending fees and payment reminders.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className={
                  notifications.fees
                    ? "settings-toggle active"
                    : "settings-toggle"
                }
                onClick={() =>
                  handleNotificationChange("fees")
                }
                aria-label="Toggle fee notifications"
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>


        {/* ========================================
            Appearance
        ======================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon appearance-icon">
              <Palette size={19} />
            </div>

            <div>
              <h3>Appearance</h3>

              <p>
                Manage how the student portal looks.
              </p>
            </div>

          </div>


          <div className="appearance-content">

            <div className="appearance-option selected">

              <div className="appearance-preview light-preview">
                <div className="preview-top"></div>

                <div className="preview-body">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div>
                <h4>Light</h4>

                <p>
                  Clean and bright interface
                </p>
              </div>

            </div>


            <div className="appearance-info">

              <span className="appearance-status">
                Current appearance
              </span>

              <strong>
                Light Mode
              </strong>

            </div>

          </div>

        </section>


        {/* ========================================
            Account Security
        ======================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon security-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h3>Account Security</h3>

              <p>
                Keep your student account secure.
              </p>
            </div>

          </div>


          <div className="security-content">

            <div className="security-item">

              <div className="security-item-icon">
                <LockKeyhole size={17} />
              </div>

              <div>
                <h4>Password Protection</h4>

                <p>
                  Use a strong password for your account.
                </p>
              </div>

            </div>


            <div className="security-item">

              <div className="security-item-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <h4>Student Account</h4>

                <p>
                  Your account settings are managed securely.
                </p>
              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Settings;