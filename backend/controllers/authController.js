const User = require("../models/User");
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    if (!email || !password || !loginAs) {
      return res.status(400).json({
        message: "Email, password and login type required",
      });
    }

    let user;

    // ================= ADMIN LOGIN =================
    if (loginAs === "admin") {
      user = await User.findOne({ email });

      if (!user || user.role !== "admin") {
        return res.status(401).json({
          message: "Admin not found",
        });
      }
    }

    // ================= AGENT LOGIN =================
    if (loginAs === "agent") {
      user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Agent not found",
        });
      }

      // default true if old records missing field
      if (user.isActive === false) {
        return res.status(403).json({
          message: "Agent account is deactivated",
        });
      }
    }

    // ================= PASSWORD CHECK =================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id, loginAs),
      user: {
        id: user._id,
        email: user.email,
        role: loginAs,
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
