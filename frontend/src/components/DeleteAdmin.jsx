import { useState } from "react";
import axios from "../api/axios";
import "./addAdmin.css";

function DeleteAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/admin/delete", {
        email,
        password,
      });

      setMessage(res.data.message);
      setEmail("");
      setPassword("");

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-admin-card">
      <h3>Delete Admin</h3>

      {error && <div className="error-msg">{error}</div>}
      {message && <div className="success-msg">{message}</div>}

      <div className="input-group">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Admin Email</label>
      </div>

      <div className="input-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
      </div>

      <button
        className="add-admin-btn delete"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Admin"}
      </button>
    </div>
  );
}

export default DeleteAdmin;