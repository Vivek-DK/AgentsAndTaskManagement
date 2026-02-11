import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./tasklist.css";

export default function TaskList() {

  // state for tasks and delete confirmations
  const [tasks, setTasks] = useState([]);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // fetch tasks on component load
  useEffect(() => {
    axios.get("/upload/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // DELETE SINGLE TASK
  const deleteTask = async () => {
    try {
      await axios.delete(`/tasks/${taskToDelete}`);
      setTasks(prev => prev.filter(t => t._id !== taskToDelete));
      setTaskToDelete(null);
    } catch {
      alert("Delete failed");
    }
  };

  // DELETE ALL TASKS
  const deleteAllTasks = async () => {
    try {
      await axios.delete("/tasks");
      setTasks([]);
      setShowDeleteAllConfirm(false);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="task-container">

      {/* TOP BAR */}
      <div className="task-top">
        <h3 className="task-title">Tasks</h3>

        {tasks.length > 0 && (
          <button
            className="delete-all-btn"
            onClick={() => setShowDeleteAllConfirm(true)}
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
        <span>Action</span>
      </div>

      {/* BODY */}
      <div className="task-body">
        {tasks.length === 0 ? (
          <div className="empty-task">No tasks available</div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="task-row">
              <span className="task-name">{task.FirstName}</span>
              <span>{task.Phone}</span>
              <span className="task-notes">{task.Notes}</span>
              <span>{task.agent?.name || "—"}</span>

              <button
                className="delete-btn"
                onClick={() => setTaskToDelete(task._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* DELETE ALL MODAL */}
      {showDeleteAllConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Delete All Tasks</h3>
            <p>This action cannot be undone.</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteAllConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={deleteAllTasks}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE DELETE MODAL */}
      {taskToDelete && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Delete Task</h3>
            <p>This task will be permanently removed.</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={deleteTask}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
