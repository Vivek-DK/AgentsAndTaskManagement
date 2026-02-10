import { useState } from "react";
import axios from "../api/axios";
import "./addAgent.css";

export default function AddAgent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // MOBILE VALIDATION (10 digits)
  const isValidMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./]).{8,}$/.test(password);
  };

  const submit = async () => {
    setError("");
    setSuccess("");

    // REQUIRED CHECK
    if (!form.name || !form.email || !form.mobile || !form.password) {
      setError("All fields are required");
      return;
    }

    // EMAIL CHECK
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    // MOBILE CHECK
    if (!isValidMobile(form.mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    if(!isValidPassword(form.password)) {
      setError("Password must contain uppercase, lowercase, number and special character (min 8 characters)");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/agents", form);

      setForm({
        name: "",
        email: "",
        mobile: "",
        password: ""
      });

      setSuccess("Agent added successfully");

    } catch (err) {
      // backend error message
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-agent-card">

      <h3>Add Agent</h3>

      {error && (
        <div className="error-msg">
          {error}
        </div>
      )}

      {success && (
        <div className="success-msg">
          {success}
        </div>
      )}

      <div className="input-group">
        <input
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value.replace(/[^a-zA-Z\s]/g, "")})}
          required
        />
        <label>Name</label>
      </div>

      <div className="input-group">
        <input
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        />
        <label>Email</label>
      </div>

      <div className="input-group">
        <input
          value={form.mobile}
          onChange={e => setForm({...form, mobile: e.target.value})}
          required
        />
        <label>Mobile</label>
      </div>

      <div className="input-group">
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          required
        />
        <label>Password</label>
      </div>
        <small className="password-hint">
          Must include uppercase, lowercase, number & symbol
        </small>

      <button
        className="add-agent-btn"
        onClick={submit}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : "Add Agent"}
      </button>

    </div>
  );
}
