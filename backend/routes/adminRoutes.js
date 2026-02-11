const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  createAdmin,
  deleteAdminByCredentials,
  getAdmins,
  getMyAdminProfile
} = require("../controllers/adminController");

// create new admin (admin only)
router.post(
  "/create-admin",
  protect,
  authorize("admin"),
  createAdmin
);

// get all admins list
router.get(
  "/",
  protect,
  authorize("admin"),
  getAdmins
);

// delete admin using credentials
router.post(
  "/delete",
  protect,
  authorize("admin"),
  deleteAdminByCredentials
);

// get logged-in admin profile
router.get(
  "/me",
  protect,
  authorize("admin"),
  getMyAdminProfile
);

module.exports = router;
