import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  UserRound,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const studentId = formData.studentId.trim();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // =========================
    // VALIDATION
    // =========================

    if (
      !studentId ||
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    if (studentId.length < 3) {
      setError("Please enter a valid Student ID.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // =========================
    // SEND SIGNUP OTP
    // =========================

    try {
      setLoading(true);

      await api.post("/auth/signup/send-otp", {
        studentId: studentId,
        password: password,
        name: name,
        email: email,
      });

      // Store Student ID temporarily
      sessionStorage.setItem(
        "signupStudentId",
        studentId
      );

      navigate("/signup-verify-otp");

    } catch (error) {

      if (error.response?.status === 409) {
        setError("Student ID already exists.");
      } else {
        setError(
          "Unable to send OTP. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* =========================
          LEFT BRAND SECTION
      ========================= */}

      <section className="signup-brand-section">

        <div className="signup-brand-content">

          <div className="signup-brand-logo">
            <GraduationCap size={31} />
          </div>

          <h1>Student ERP</h1>

          <p>
            Your academic journey, organized in one place.
          </p>

          <div className="signup-brand-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </section>


      {/* =========================
          RIGHT FORM SECTION
      ========================= */}

      <section className="signup-form-section">

        <div className="signup-container">

          <div className="signup-mobile-logo">

            <div className="signup-mobile-logo-icon">
              <GraduationCap size={24} />
            </div>

            <span>
              Student ERP
            </span>

          </div>


          <div className="signup-heading">

            <h2>Create account</h2>

            <p>
              Register using your student details.
            </p>

          </div>


          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            {/* FULL NAME */}

            <div className="signup-form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="signup-input-wrapper">

                <UserRound size={18} />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

              </div>

            </div>


            {/* STUDENT ID */}

            <div className="signup-form-group">

              <label htmlFor="studentId">
                Student ID
              </label>

              <div className="signup-input-wrapper">

                <UserRound size={18} />

                <input
                  id="studentId"
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="signup-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="signup-input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="signup-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="signup-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />

                <button
                  type="button"
                  className="signup-password-visibility-button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="signup-form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="signup-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  className="signup-password-visibility-button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="signup-error">
                {error}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="signup-submit-button"
              disabled={loading}
            >

              {loading
                ? "Sending OTP..."
                : "Continue"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>


          {/* LOGIN LINK */}

          <div className="signup-login-link">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Signup;