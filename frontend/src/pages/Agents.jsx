import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaChevronRight } from "react-icons/fa";
import "./agents.css";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [agentTasks, setAgentTasks] = useState({});
  const role = localStorage.getItem("role");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    axios.get("/agents")
      .then(res => {
        const sortedAgents = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAgents(sortedAgents);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleAgent = async (id) => {
    if (expandedAgent === id) {
      setExpandedAgent(null);
      return;
    }

    setExpandedAgent(id);

    // fetch only if not already loaded
    if (!agentTasks[id]) {
      try {
        const res = await axios.get(`/tasks/agent/${id}`);

        setAgentTasks(prev => ({
          ...prev,
          [id]: res.data
        }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deactivateAgent = async () => {
    try {
      await axios.delete(`/agents/${confirmDelete}`);
      const res = await axios.get("/agents");
      setAgents(res.data);
      setConfirmDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || "Deactivation failed");
    }
  };

  return (
    <div className="agentscontainer">
      <h2 className="agents-title">Agents</h2>

      {agents.length === 0 ? (

        <div className="empty-state">
          No agents added yet
        </div>
      ) : (

        <>
          {/* HEADER */}
          <div className="agent-header">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span></span>
          </div>

          {/* ROWS */}
          <div className="agents-scroll">
            {agents.map((agent) => (
              <div key={agent._id} className="agent-row-wrapper">

                <div className="agent-row">
                  <span className="agent-name">{agent.name}</span>
                  <span>{agent.email}</span>
                  <span>{agent.mobile}</span>

                  <button
                    className={`expand-btn ${
                      expandedAgent === agent._id ? "open" : ""
                    }`}
                    onClick={() => toggleAgent(agent._id)}
                  >
                    <FaChevronRight />
                  </button>
    
                  {role === "admin" && (
                    <button
                      className="delete-agent-btn"
                      onClick={() => setConfirmDelete(agent._id)}
                    >
                      Deactivate
                    </button>
                  )}
                  {confirmDelete && (
                    <div className="logout-overlay">
                      <div className="logout-modal">
                        <h3>Delete Agent</h3>
                        <p>Are you sure you want to deactivate this agent?</p>

                        <div className="logout-actions">
                          <button
                            className="cancel-btn"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>

                          <button
                            className="confirm-btn"
                            onClick={deactivateAgent}
                          >
                            Deactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`agent-expand ${
                    expandedAgent === agent._id ? "show" : ""
                  }`}
                >
                  <div className="task-panel">

                    <p><strong>Assigned Tasks:</strong></p>

                    {agentTasks[agent._id]?.length > 0 ? (
                      <>
                        <div className="task-scroll">
                          {agentTasks[agent._id].map(task => (
                            <div key={task._id} className="agent-task-item">
                              <div>
                                <strong>{task.FirstName}</strong>
                                <span> • {task.Phone}</span> <br />
                                <strong>{task.Notes}</strong>
                              </div>
                              <div className="task-note">
                                {task.notes}
                              </div>
                            </div>
                          ))}
                        </div>  
                        <p className="task-count">
                          Total tasks assigned: {agentTasks[agent._id].length}
                        </p>
                      </>
                    ) : (
                      <p>No tasks assigned</p>
                    )}

                  </div>
                </div>


              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}