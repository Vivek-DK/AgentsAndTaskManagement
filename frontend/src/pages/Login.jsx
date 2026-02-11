import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../layout/Navbar";
import "./login.css";

export default function Login({ role }) {

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // animation and UI states
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // trigger card animation on mount
  useEffect(() => {
    setShow(true);
  }, []);

  // login handler
  const login = async () => {
    setError("");

    // basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // login request
      const res = await axios.post("/auth/login", {
        email,
        password,
        loginAs: role,
      });

      const userRole = res.data.user.role;

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);

      // redirect based on role
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/agent-dashboard");
      }

    } catch (err) {
      // show backend error if available
      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">

        {/* background shapes */}
        <div className="login-shape shape1"></div>
        <div className="login-shape shape2"></div>

        <div className={`login-card ${show ? "show" : ""}`}>

          <h2>
            {role === "admin" ? "Admin Login" : "Agent Login"}
          </h2>

          {/* error message */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* email input */}
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* password input */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* login button */}
          <button onClick={login} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>
      </div>
    </>
  );
}
