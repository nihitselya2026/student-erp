import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  GraduationCap,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  try {
    const response = await api.post("/auth/login", {
      studentId: formData.studentId.trim(),
      password: formData.password,
    });

    localStorage.setItem("token", "student-session");

    localStorage.setItem(
      "student",
      JSON.stringify(response.data)
    );

    navigate("/dashboard", {
      replace: true,
    });
  } catch (error) {
    setError("Invalid Student ID or password.");
  }
};

  return (
    <div className="login-page">

      {/* Left Section */}
      <section className="login-brand-section">

        <div className="login-brand-content login-animate-brand">

          <div className="login-brand-logo">
            <GraduationCap size={31} />
          </div>

          <h1>Student ERP</h1>

          <p>
            Your academic journey, organized in one place.
          </p>

          <div className="login-brand-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </section>


      {/* Right Section */}
      <section className="login-form-section">

        <div className="login-container login-animate-container">

          <div className="login-mobile-logo">

            <div className="login-mobile-logo-icon">
              <GraduationCap size={24} />
            </div>

            <span>
              Student ERP
            </span>

          </div>


          <div className="login-heading login-animate-heading">          

            <h2>Welcome back</h2>

            <p>
              Sign in using your college-provided credentials.
            </p>

          </div>


          <form
  className="login-form login-animate-form"
  onSubmit={handleSubmit}
>

            {/* Student ID */}

            <div className="login-form-group">

              <label htmlFor="studentId">
                Student ID
              </label>

              <div className="login-input-wrapper">

                <UserRound size={18} />

                <input
                  id="studentId"
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                  autoComplete="username"
                  required
                />

              </div>

            </div>


            {/* Password */}

            <div className="login-form-group">

              <div className="login-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
  type="button"
  className="forgot-password-button"
  onClick={() => navigate("/forgot-password")}
>
  Forgot password?
</button>

              </div>


              <div className="login-input-wrapper">

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-visibility-button"
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


            {/* Error */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* Login */}

            <button
              type="submit"
              className="login-submit-button"
            >
              Sign In

              <ArrowRight size={17} />
            </button>

          </form>


          <div className="login-help">

            <p>
              Having trouble signing in?
            </p>

            <span>
              Contact your college administration for assistance.
            </span>

          </div>
          <div className="login-signup-link">

  <span>
    Don't have an account?
  </span>

  <button
    type="button"
    onClick={() => navigate("/signup")}
  >
    Sign up
  </button>

</div>

        </div>

      </section>

    </div>
  );
}

export default Login;