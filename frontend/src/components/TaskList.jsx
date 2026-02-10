import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./tasklist.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [confirm, setConfirm] = useState(null); 
  // { type: "single" | "all", id?: string }

  useEffect(() => {
    axios.get("/upload/tasks")
      .then(res => setTasks(res.data));
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
    setConfirm(null);
  };

  const deleteAllTasks = async () => {
    await axios.delete("/tasks");
    setTasks([]);
    setConfirm(null);
  };

  return (
    <div className="task-container">

      <div className="task-top">
        <h3 className="task-title">Tasks</h3>

        {tasks.length > 0 && (
          <button
            className="delete-all-btn"
            onClick={() => setConfirm({ type: "all" })}
          >
            Delete All
          </button>
        )}
      </div>

      {/* HEADER */}
      <div className="task-header">
        <span>Name</span>
        <span>Phone</span>
        <span>Notes</span>
        <span>Agent</span>
        <span></span>
      </div>

      {/* BODY */}
      <div className="task-body">
        {tasks.map(task => (
          <div key={task._id} className="task-row">
            <span className="task-name">{task.FirstName}</span>
            <span>{task.Phone}</span>
            <span className="task-notes">{task.Notes}</span>
            <span>{task.agent?.name || "—"}</span>

            <button
              className="delete-btn"
              onClick={() =>
                setConfirm({ type: "single", id: task._id })
              }
            >
              Delete
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="empty-task">No tasks available</div>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {confirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Delete</h3>

            <p>
              {confirm.type === "all"
                ? "Delete all tasks? This cannot be undone."
                : "Delete this task?"}
            </p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setConfirm(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={() =>
                  confirm.type === "all"
                    ? deleteAllTasks()
                    : deleteTask(confirm.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
