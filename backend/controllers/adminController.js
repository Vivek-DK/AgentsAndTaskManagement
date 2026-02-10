const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAdminByCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = req.user;

    if (currentUser.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.isSuperAdmin) {
      return res.status(400).json({
        message: "Super admin cannot be deleted",
      });
    }

    if (admin._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    await admin.deleteOne();

    res.json({
      message: "Admin deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {createAdmin, deleteAdminByCredentials, getAdmins}