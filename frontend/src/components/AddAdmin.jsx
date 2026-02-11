import { useState } from "react";
import axios from "../api/axios";
import "./addAdmin.css";

export default function AddAdmin() {

  // form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: ""
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // strong password validation
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./]).{8,}$/.test(password);

  // phone validation (10 digit Indian number)
  const isValidPhone = (mobile) =>
    /^[6-9]\d{9}$/.test(mobile);

  // form submit handler
  const submit = async () => {
    setError("");
    setSuccess("");

    // required fields check
    if (!form.email || !form.password || !form.mobile) {
      setError("All fields are required");
      return;
    }

    // validations
    if (!isValidEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    if (!isValidPhone(form.mobile)) {
      setError("Enter valid 10 digit mobile number");
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

      // API call to create admin
      await axios.post("/admin/create-admin", form);

      setSuccess("Admin created successfully");

      // reset form
      setForm({
        email: "",
        password: "",
        mobile: ""
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

      {/* error and success messages */}
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      {/* EMAIL */}
      <div className="input-group">
        <input
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <label>Email</label>
      </div>

      {/* PHONE */}
      <div className="input-group">
        <input
          value={form.mobile}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
          maxLength={10}
        />
        <label>Mobile Number</label>
      </div>

      {/* PASSWORD */}
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
