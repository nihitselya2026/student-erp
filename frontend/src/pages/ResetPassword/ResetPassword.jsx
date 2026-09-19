import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const studentId =
    sessionStorage.getItem("forgotPasswordStudentId");

  const otp =
    sessionStorage.getItem("forgotPasswordOtp");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!studentId || !otp) {
      setError(
        "Your password reset session has expired. Please start again."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/forgot-password/reset-password",
        {
          studentId: studentId,
          otp: otp,
          newPassword: newPassword,
        }
      );

      // Clear forgot-password session data
      sessionStorage.removeItem(
        "forgotPasswordStudentId"
      );

      sessionStorage.removeItem(
        "forgotPasswordOtp"
      );

      navigate("/login", {
        replace: true,
      });

    } catch (error) {
      if (error.response?.status === 400) {
        setError(
          "Invalid or expired OTP. Please start the password reset process again."
        );
      } else {
        setError(
          "Unable to reset password. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">

      <div className="reset-password-card">

        {/* Logo */}
        <div className="reset-password-logo">
          <GraduationCap size={34} />
        </div>

        <h1>Reset Password</h1>

        <p className="reset-password-description">
          Create a new password for your Student ERP account.
        </p>

        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <div className="reset-password-input-group">

            <label>New Password</label>

            <div className="reset-password-input-wrapper">

              <LockKeyhole size={19} />

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="reset-password-eye"
                onClick={() =>
                  setShowNewPassword(
                    (previous) => !previous
                  )
                }
              >
                {showNewPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div className="reset-password-input-group">

            <label>Confirm Password</label>

            <div className="reset-password-input-wrapper">

              <LockKeyhole size={19} />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value
                  );
                  setError("");
                }}
              />

              <button
                type="button"
                className="reset-password-eye"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="reset-password-error">
              {error}
            </div>
          )}

          {/* Reset Password */}
          <button
            type="submit"
            className="reset-password-submit"
            disabled={loading}
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}

            {!loading && (
              <ArrowRight size={18} />
            )}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;