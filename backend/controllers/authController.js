const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate JWT token for authenticated user
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const loginUser = async (req, res) => {
  try {
    const { email, password, loginAs } = req.body;

    // basic validation
    if (!email || !password || !loginAs) {
      return res.status(400).json({
        message: "Email, password and login type required",
      });
    }

    // normalize email to avoid case issues
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    // ================= ROLE VALIDATION =================

    // prevent admin login as agent
    if (loginAs === "agent" && user.role !== "agent") {
      return res.status(403).json({
        message: "Admins cannot login as agent",
      });
    }

    // prevent agent login as admin
    if (loginAs === "admin" && user.role !== "admin") {
      return res.status(403).json({
        message: "Agents cannot login as admin",
      });
    }

    // ================= ACTIVE CHECK =================
    // check if agent account is active
    if (user.role === "agent" && user.isActive === false) {
      return res.status(403).json({
        message: "Agent account is deactivated",
      });
    }

    // ================= PASSWORD CHECK =================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // send token and basic user info
    res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { loginUser };
