const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const distributeTasks = require("../services/distributionService");

// ADD AGENT (ADMIN ONLY)
const User = require("../models/User");

const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const agentExists = await Agent.findOne({ email });
    const userExists = await User.findOne({ email });

    if (agentExists || userExists) {
      return res.status(400).json({
        message: "Agent already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "agent"
    });

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Agent created successfully",
      agent
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN ONLY
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({
      isActive: true
    }).select("-password")
      .sort({ createdAt: -1 });

    res.json(agents);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN ONLY
const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("agent", "name email")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

const getMyProfile = async (req, res) => {
  try {
    const agent = await Agent.findOne({
      email: req.user.email
    }).select("-password");

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    res.json(agent);

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deactivateAgent = async (req, res) => {
  try {
    const agentId = req.params.id;

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    // deactivate instead of delete
    agent.isActive = false;
    await agent.save();

    // ✅ get tasks of this agent
    const tasks = await Task.find({ agent: agentId });

    if (tasks.length > 0) {

      // remaining active agents
      const activeAgents = await Agent.find({
        isActive: true,
        _id: { $ne: agentId }
      });

      if (activeAgents.length) {

        const redistributed = distributeTasks(tasks, activeAgents);

        for (let i = 0; i < tasks.length; i++) {
          tasks[i].agent = redistributed[i].agent;
          await tasks[i].save();
        }
      }
    }

    res.json({
      message: "Agent deactivated and tasks reassigned"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { addAgent, getAgents, getTasks, getMyProfile, deactivateAgent };
