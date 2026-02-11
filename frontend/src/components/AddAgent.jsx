import { useState } from "react";
import axios from "../api/axios";
import "./addAgent.css";

export default function AddAgent() {

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  // UI states
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

  // PASSWORD VALIDATION
  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./]).{8,}$/.test(password);
  };

  // submit handler
  const submit = async () => {
    setError("");
    setSuccess("");

    // required fields check
    if (!form.name || !form.email || !form.mobile || !form.password) {
      setError("All fields are required");
      return;
    }

    // email validation
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    // mobile validation
    if (!isValidMobile(form.mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    // password validation
    if (!isValidPassword(form.password)) {
      setError("Password must contain uppercase, lowercase, number and special character (min 8 characters)");
      return;
    }

    try {
      setLoading(true);

      // API call to create agent
      await axios.post("/agents", form);

      // reset form after success
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

      {/* error message */}
      {error && (
        <div className="error-msg">
          {error}
        </div>
      )}

      {/* success message */}
      {success && (
        <div className="success-msg">
          {success}
        </div>
      )}

      {/* NAME */}
      <div className="input-group">
        <input
          value={form.name}
          onChange={e =>
            setForm({
              ...form,
              name: e.target.value.replace(/[^a-zA-Z\s]/g, "")
            })
          }
          required
        />
        <label>Name</label>
      </div>

      {/* EMAIL */}
      <div className="input-group">
        <input
          value={form.email}
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />
        <label>Email</label>
      </div>

      {/* MOBILE */}
      <div className="input-group">
        <input
          value={form.mobile}
          onChange={e =>
            setForm({
              ...form,
              mobile: e.target.value.replace(/\D/g, "")
            })
          }
          required
        />
        <label>Mobile</label>
      </div>

      {/* PASSWORD */}
      <div className="input-group">
        <input
          type="password"
          value={form.password}
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
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
