import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../components/Footer";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [showWarning, setShowWarning] = useState(false);
  const [targetLogin, setTargetLogin] = useState("");

  const handleLoginClick = (type) => {
    if (!token) {
      navigate(`/login/${type}`);
      return;
    }

    // already logged in → show warning
    setTargetLogin(type);
    setShowWarning(true);
  };

  const confirmLogoutAndContinue = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowWarning(false);
    navigate(`/login/${targetLogin}`);
  };

  return (
    <>
      <div className="landing-container">
        <Navbar />

        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>

        <div className="dashboard-preview">
          <div className="preview-card">
            <div className="preview-header">Agents</div>
            <div className="preview-row"></div>
            <div className="preview-row short"></div>
            <div className="preview-row"></div>
          </div>
        </div>

        <div className="dashboard-preview-1">
          <div className="preview-card">
            <div className="preview-header">Tasks</div>
            <div className="preview-row"></div>
            <div className="preview-row short"></div>
            <div className="preview-row"></div>
          </div>
        </div>

        <div className="hero">
          <h1 className="hero-title">
            Manage Agents & Tasks <span>Efficiently</span>
          </h1>

          <p className="hero-subtitle">
            Upload CSV, XLSX files, distribute tasks automatically,
            and manage your workflow with ease.
          </p>

          <div className="cta-group">
            <button
              className="cta-btn admin"
              onClick={() => handleLoginClick("admin")}
            >
              Login as Admin
            </button>

            <button
              className="cta-btn agent"
              onClick={() => handleLoginClick("agent")}
            >
              Login as Agent
            </button>
          </div>
        </div>

        {/* WARNING MODAL */}
        {showWarning && (
          <div className="logout-overlay">
            <div className="logout-modal">
              <h3>Already Logged In</h3>
              <p>
                You are already logged in. Please logout before switching accounts.
              </p>

              <div className="logout-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowWarning(false)}
                >
                  Cancel
                </button>

                <button
                  className="confirm-btn"
                  onClick={confirmLogoutAndContinue}
                >
                  Logout & Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
    
  );
}

export default Landing;