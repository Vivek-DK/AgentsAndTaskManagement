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

router.post("/", protect, authorize("admin"), addAgent);
router.get("/", protect, authorize("admin"), getAgents);
router.get("/tasks", protect, authorize("admin"), getTasks);
router.get("/me", protect, getMyProfile);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deactivateAgent
);

module.exports = router;
