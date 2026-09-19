import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import "./VerifyOtp.css";

function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const studentId =
    sessionStorage.getItem("forgotPasswordStudentId");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!studentId) {
      setError("Session expired. Please request a new OTP.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.trim().length !== 6) {
      setError("OTP must contain 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/forgot-password/verify-otp", {
        studentId: studentId,
        otp: otp.trim(),
      });

      sessionStorage.setItem(
        "forgotPasswordOtp",
        otp.trim()
      );

      navigate("/reset-password");

    } catch (error) {
      if (error.response?.status === 400) {
        setError("Invalid or expired OTP.");
      } else {
        setError("Unable to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-page">

      <div className="verify-otp-card">

        {/* Logo */}
        <div className="verify-otp-logo">
          <GraduationCap size={34} />
        </div>

        <h1>Verify OTP</h1>

        <p className="verify-otp-description">
          Enter the 6-digit OTP sent to your registered
          email address.
        </p>

        <form onSubmit={handleSubmit}>

          {/* OTP */}
          <div className="verify-otp-input-group">

            <label>Enter OTP</label>

            <div className="verify-otp-input-wrapper">

              <ShieldCheck size={20} />

              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(/\D/g, "");

                  setOtp(value);
                  setError("");
                }}
              />

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="verify-otp-error">
              {error}
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            className="verify-otp-submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}

            {!loading && <ArrowRight size={18} />}
          </button>

        </form>

        {/* Back */}
        <button
          type="button"
          className="verify-otp-back"
          onClick={() => navigate("/forgot-password")}
        >
          <ArrowLeft size={17} />
          Back
        </button>

      </div>

    </div>
  );
}

export default VerifyOtp;