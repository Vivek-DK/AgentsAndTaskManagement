import { useState, useEffect } from "react";
import Agents from "./Agents";
import TaskList from "../components/TaskList";
import AddAgent from "../components/AddAgent";
import AddTask from "../components/AddTask";
import AddAdmin from "../components/AddAdmin";
import DeleteAdmin from "../components/DeleteAdmin";
import "./adminDashboard.css";
import axios from "../api/axios";

export default function AdminDashboard() {

  // active tab state
  const [activeTab, setActiveTab] = useState("agents");

  // logged-in admin data
  const [admin, setAdmin] = useState(null);

  // fetch admin details on load
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get("/admin/me");
      setAdmin(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* ADMIN INFO CARD */}
      <div className="admin-info-card">
        <div className="admin-avatar">
          {admin?.email?.charAt(0).toUpperCase()}
        </div>

        <div className="admin-details">
          <p className="admin-role">Administrator</p>
          <h3 className="admin-name">
            {admin?.email || "Loading..."}
          </h3>
          <span className="admin-phone">
            {admin?.mobile || "No phone number"}
          </span>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="dashboard-top">
        <div className="dashboard-tabs">

          {/* NAVIGATION TABS */}
          <div className="tab-group">

            <button
              className={activeTab === "agents" ? "tab active" : "tab"}
              onClick={() => setActiveTab("agents")}
            >
              Agents
            </button>

            <button
              className={activeTab === "tasks" ? "tab active" : "tab"}
              onClick={() => setActiveTab("tasks")}
            >
              Tasks
            </button>

            <button
              className={activeTab === "addAgent" ? "tab active" : "tab"}
              onClick={() => setActiveTab("addAgent")}
            >
              + Agent
            </button>

            <button
              className={activeTab === "addTask" ? "tab active" : "tab"}
              onClick={() => setActiveTab("addTask")}
            >
              + Task
            </button>

            <button
              className={
                activeTab === "addAdmin"
                  ? "tab admin active"
                  : "tab admin"
              }
              onClick={() => setActiveTab("addAdmin")}
            >
              + Admin
            </button>

            <button
              className={
                activeTab === "deleteAdmin"
                  ? "tab danger active"
                  : "tab danger"
              }
              onClick={() => setActiveTab("deleteAdmin")}
            >
              Delete Admin
            </button>

          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="dashboard-content">

        {activeTab === "agents" && (
          <div className="fade-in">
            <Agents />
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="fade-in">
            <TaskList />
          </div>
        )}

        {activeTab === "addAgent" && (
          <div className="fade-in agent-form">
            <AddAgent />
          </div>
        )}

        {activeTab === "addTask" && (
          <div className="fade-in task-form">
            <AddTask />
          </div>
        )}

        {activeTab === "addAdmin" && (
          <div className="fade-in">
            <AddAdmin />
          </div>
        )}

        {activeTab === "deleteAdmin" && (
          <div className="fade-in">
            <DeleteAdmin />
          </div>
        )}

      </div>
    </div>
  );
}
