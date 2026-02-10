import { useState } from "react";
import Agents from "./Agents";
import TaskList from "../components/TaskList";
import AddAgent from "../components/AddAgent";
import AddTask from "../components/AddTask";
import AddAdmin from "../components/AddAdmin";
import DeleteAdmin from "../components/DeleteAdmin";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("agents");

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* TOP BAR */}
      <div className="dashboard-top">

        {/* NAVIGATION */}
        <div className="dashboard-tabs">
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
            + Agents
          </button>

          <button
            className={activeTab === "addTask" ? "tab active" : "tab"}
            onClick={() => setActiveTab("addTask")}
          >
            + Tasks
          </button>

          <button
            className={activeTab === "addAdmin" ? "tab active" : "tab"}
            onClick={() => setActiveTab("addAdmin")}
          >
            + Admin
          </button>
          {activeTab === "addAdmin" && (
            <div className="fade-in">
              <AddAdmin />
            </div>
          )}
          <button
            className={activeTab === "deleteAdmin" ? "tab active" : "tab"}
            onClick={() => setActiveTab("deleteAdmin")}
          >
            Delete Admin
          </button>
          {activeTab === "deleteAdmin" && (
            <div className="fade-in">
              <DeleteAdmin />
            </div>
          )}

        </div>
      </div>

      {/* CONTENT AREA */}
      <div>

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
          <div className="fade-in">
            <AddAgent />
          </div>
        )}

        {activeTab === "addTask" && (
          <div className="fade-in">
            <AddTask />
          </div>
        )}

      </div>
    </div>
  );
}
