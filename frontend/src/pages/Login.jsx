import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../layout/Navbar";
import "./login.css";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  const login = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/auth/login", {
        email,
        password,
        loginAs: role,
      });
      const userRole = res.data.user.role;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/agent-dashboard");
      }
    } catch (err) {
      // backend message if exists
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
        <div className="login-shape shape1"></div>
        <div className="login-shape shape2"></div>

        <div className={`login-card ${show ? "show" : ""}`}>
          <h2>
            {role === "admin" ? "Admin Login" : "Agent Login"}
          </h2>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>   
  );
}
