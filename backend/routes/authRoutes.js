const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { loginUser } = require("../controllers/authController");

// POST /api/auth/login
router.post("/login", protect, loginUser);

module.exports = router;
