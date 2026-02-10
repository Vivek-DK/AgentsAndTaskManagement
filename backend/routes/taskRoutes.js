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

router.get("/my-tasks", protect, getMyTasks);

router.get(
  "/agent/:agentId",
  protect,
  authorize("admin"),
  getTasksByAgentId
);

router.delete("/:id", protect, authorize("admin"), deleteTask);
router.delete("/", protect, authorize("admin"), deleteAllTasks);


module.exports = router;
