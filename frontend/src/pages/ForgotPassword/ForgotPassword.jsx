import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  UserRound,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!studentId.trim() || !email.trim()) {
      setError("Please enter Student ID and email.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/forgot-password/send-otp", {
        studentId: studentId.trim(),
        email: email.trim(),
      });

      setSuccess("OTP sent successfully to your email.");

      // Store Student ID temporarily for the next step
      sessionStorage.setItem(
        "forgotPasswordStudentId",
        studentId.trim()
      );

      navigate("/verify-otp");
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Student ID and email do not match.");
      } else {
        setError("Unable to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">

      <div className="forgot-password-card">

        {/* Logo */}
        <div className="forgot-password-logo">
          <GraduationCap size={34} />
        </div>

        <h1>Forgot Password?</h1>

        <p className="forgot-password-description">
          Enter your Student ID and registered email address.
          We will send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Student ID */}
          <div className="forgot-password-input-group">

            <label>Student ID</label>

            <div className="forgot-password-input-wrapper">
              <UserRound size={19} />

              <input
                type="text"
                name="studentId"
                placeholder="Enter your Student ID"
                value={studentId}
                onChange={(event) => {
                  setStudentId(event.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

          </div>

          {/* Email */}
          <div className="forgot-password-input-group">

            <label>Email Address</label>

            <div className="forgot-password-input-wrapper">
              <Mail size={19} />

              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="forgot-password-error">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="forgot-password-success">
              {success}
            </div>
          )}

          {/* Send OTP */}
          <button
            type="submit"
            className="forgot-password-submit"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}

            {!loading && <ArrowRight size={18} />}
          </button>

        </form>

        {/* Back to Login */}
        <button
          type="button"
          className="forgot-password-back"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={17} />
          Back to Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;