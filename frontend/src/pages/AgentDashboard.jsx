import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./agentDashboard.css";

function AgentDashboard() {

  // state for tasks and agent info
  const [tasks, setTasks] = useState([]);
  const [agent, setAgent] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // fetch data on component load
  useEffect(() => {
    fetchAgent();
    fetchTasks();
  }, []);

  // fetch logged-in agent details
  const fetchAgent = async () => {
    try {
      const res = await axios.get("/agents/me");
      setAgent(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch tasks assigned to agent
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/my-tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTasks(false);
    }
  };

  return (
    <div className="agent-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <p>Welcome back, {agent?.name || "Loading..."}</p>
      </div>

      {/* AGENT INFO + STATS */}
      <div className="dashboard-top">

        <div className="agent-info-card">
          <div className="avatar">
            {agent?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{agent?.name}</h3>
            <p>{agent?.email}</p>
            <span>{agent?.mobile}</span>
          </div>
        </div>

        <div className="stats-card">
          <h4>Total Tasks</h4>
          <span>{tasks.length}</span>
        </div>

      </div>

      {/* TASKS SECTION */}
      <div className="agent-task-container">
        <h3>Assigned Tasks</h3>

        {loadingTasks ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks assigned</p>
        ) : (
          <div className="task-grid">
            {tasks.map(task => (
              <div key={task._id} className="agent-task-card">
                <div className="task-header">
                  <strong>{task.FirstName}</strong>
                  <span>{task.Phone}</span>
                </div>
                <p>{task.Notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default AgentDashboard;
