import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import "./SignupVerifyOtp.css";

function SignupVerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const studentId =
    sessionStorage.getItem("signupStudentId");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!studentId) {
      setError(
        "Signup session expired. Please start again."
      );
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

      await api.post(
        "/auth/signup/verify-otp",
        {
          studentId: studentId,
          otp: otp.trim(),
        }
      );

      sessionStorage.removeItem(
        "signupStudentId"
      );

      navigate("/login", {
        replace: true,
      });

    } catch (error) {

      if (error.response?.status === 400) {
        setError("Invalid or expired OTP.");
      } else {
        setError(
          "Unable to verify OTP. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-verify-otp-page">

      <div className="signup-verify-otp-card">

        <div className="signup-verify-otp-logo">
          <GraduationCap size={34} />
        </div>

        <h1>Verify Your Email</h1>

        <p className="signup-verify-otp-description">
          Enter the 6-digit OTP sent to your email
          address to complete your registration.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="signup-verify-otp-input-group">

            <label>
              Enter OTP
            </label>

            <div className="signup-verify-otp-input-wrapper">

              <ShieldCheck size={20} />

              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setOtp(value);
                  setError("");
                }}
              />

            </div>

          </div>

          {error && (
            <div className="signup-verify-otp-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="signup-verify-otp-submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Verify & Create Account"}

            {!loading && (
              <ArrowRight size={18} />
            )}

          </button>

        </form>

        <button
          type="button"
          className="signup-verify-otp-back"
          onClick={() => navigate("/signup")}
        >
          <ArrowLeft size={17} />
          Back to Sign Up
        </button>

      </div>

    </div>
  );
}

export default SignupVerifyOtp;