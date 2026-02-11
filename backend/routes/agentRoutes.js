const express = require("express");
const router = express.Router();

const {
  addAgent,
  getAgents,
  getTasks,
  getMyProfile,
  deactivateAgent,
} = require("../controllers/agentController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// add new agent (admin only)
router.post("/", protect, authorize("admin"), addAgent);

// get all active agents (admin only)
router.get("/", protect, authorize("admin"), getAgents);

// get all tasks with agent info (admin only)
router.get("/tasks", protect, authorize("admin"), getTasks);

// get logged-in agent profile
router.get("/me", protect, getMyProfile);

// deactivate agent and reassign tasks (admin only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deactivateAgent
);

module.exports = router;
