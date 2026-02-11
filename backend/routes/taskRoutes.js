const express = require("express");
const router = express.Router();

const {
  getMyTasks,
  getTasksByAgentId,
  deleteTask,
  deleteAllTasks,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// get tasks of logged-in agent
router.get("/my-tasks", protect, getMyTasks);

// get tasks by specific agent (admin only)
router.get(
  "/agent/:agentId",
  protect,
  authorize("admin"),
  getTasksByAgentId
);

// delete single task (admin only)
router.delete("/:id", protect, authorize("admin"), deleteTask);

// delete all tasks (admin only)
router.delete("/", protect, authorize("admin"), deleteAllTasks);

module.exports = router;
