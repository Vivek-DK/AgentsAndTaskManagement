import { useState } from "react";
import axios from "../api/axios";
import "./addAdmin.css";

export default function AddAdmin() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // strong password validation
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./]).{8,}$/.test(password);

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    if (!isValidPassword(form.password)) {
      setError(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post("/admin/create-admin", form);

      setSuccess("Admin created successfully");

      setForm({
        email: "",
        password: ""
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create admin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-admin-card">

      <h3>Create Admin</h3>

      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <div className="input-group">
        <input
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <label>Email</label>
      </div>

      <div className="input-group">
        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <label>Password</label>
      </div>

      <button
        className="add-admin-btn"
        onClick={submit}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : "Create Admin"}
      </button>

    </div>
  );
}
