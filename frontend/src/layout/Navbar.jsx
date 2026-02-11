import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  // get auth data from local storage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // logout confirmation state
  const [showConfirm, setShowConfirm] = useState(false);

  // logout handler
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  // navigation helper
  function navigateTo(path) {
    navigate(path);
  }

  return (
    <nav className="navbar">

      {/* logo */}
      <p
        onClick={() => navigateTo('/')}
        className="logo"
      >
        AgentTask Manager
      </p>

      <div className="nav-actions">

        {/* home button */}
        <button
          className="nav-btn"
          onClick={() => navigateTo('/')}
        >
          Home
        </button>

        {token ? (
          <>
            {/* dashboard button */}
            <button
              className="nav-btn primary"
              onClick={() =>
                navigate(
                  role === "admin"
                    ? "/admin-dashboard"
                    : "/agent-dashboard"
                )
              }
            >
              Dashboard
            </button>

            {/* logout button */}
            <button
              className="nav-btn logout"
              onClick={() => setShowConfirm(true)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* admin login */}
            <button
              className="nav-btn"
              onClick={() => navigateTo('/login/admin')}
            >
              Admin Login
            </button>

            {/* agent login */}
            <button
              className="nav-btn"
              onClick={() => navigateTo('/login/agent')}
            >
              Agent Login
            </button>
          </>
        )}
      </div>

      {/* logout confirmation modal */}
      {showConfirm && (
        <div
          className="logout-overlaybtn"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="logout-modals"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Logout?</h3>
            <p>Are you sure you want to logout?</p>

            <div className="logout-actionsbtn">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
