const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { uploadAndDistribute } = require("../controllers/uploadController");
const { getTasks } = require("../controllers/agentController");

// upload file and distribute tasks
router.post(
  "/",
  protect,
  upload.single("file"),
  uploadAndDistribute
);

// get all tasks list
router.get(
  "/tasks",
  protect,
  getTasks
);

module.exports = router;
