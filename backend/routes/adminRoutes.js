const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const { createAdmin, deleteAdminByCredentials, getAdmins } = require("../controllers/adminController");

router.post(
  "/create-admin",
  protect,
  authorize("admin"),
  createAdmin
);

router.get("/", protect, authorize("admin"), getAdmins);

router.post(
  "/delete",
  protect,
  authorize("admin"),
  deleteAdminByCredentials
);

module.exports = router;
