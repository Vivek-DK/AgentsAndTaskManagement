const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { uploadAndDistribute } = require("../controllers/uploadController");
const { getTasks } = require("../controllers/agentController")

router.post("/", protect, upload.single("file"), uploadAndDistribute);
router.get("/tasks", protect, getTasks);

module.exports = router;
