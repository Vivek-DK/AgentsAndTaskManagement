const User = require("../models/User");
const bcrypt = require("bcryptjs");

// create new admin (admin only)
const createAdmin = async (req, res) => {
  try {
    const { email, password, mobile } = req.body;

    // basic validation
    if (!email || !password || !mobile) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // check if admin already exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin user
    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
      mobile,
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


// delete admin using credentials
const deleteAdminByCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = req.user;

    // only admins allowed
    if (currentUser.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const admin = await User.findOne({ email });

    // check admin existence
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // prevent deleting super admin
    if (admin.isSuperAdmin) {
      return res.status(400).json({
        message: "Super admin cannot be deleted",
      });
    }

    // prevent self deletion
    if (admin._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    // verify password before delete
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


// get all admins list
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


// get logged-in admin profile
const getMyAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id)
      .select("-password");

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json(admin);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createAdmin,
  deleteAdminByCredentials,
  getAdmins,
  getMyAdminProfile
};
