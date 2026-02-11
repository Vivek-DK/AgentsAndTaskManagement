const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const distributeTasks = require("../services/distributionService");

// ADD AGENT (ADMIN ONLY)
const User = require("../models/User");

const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // basic validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if email already exists in Agent or User collection
    const emailExists =
      await Agent.findOne({ email }) ||
      await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // check duplicate mobile number
    const mobileExists = await Agent.findOne({ mobile });

    if (mobileExists) {
      return res.status(400).json({
        message: "Mobile already exists",
      });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create login user
    await User.create({
      email,
      mobile,
      password: hashedPassword,
      role: "agent",
    });

    // create agent profile
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

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// ADMIN ONLY - get active agents list
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({
      isActive: true
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(agents);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN ONLY - get all tasks with assigned agent info
const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("agent", "name email")
    .sort({ createdAt: -1 });

  res.json(tasks);
};


// get logged-in agent profile
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


// deactivate agent and redistribute tasks
const deactivateAgent = async (req, res) => {
  try {
    const agentId = req.params.id;

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    // deactivate instead of deleting
    agent.isActive = false;
    await agent.save();

    // get tasks assigned to this agent
    const tasks = await Task.find({ agent: agentId });

    if (tasks.length > 0) {

      // find remaining active agents
      const activeAgents = await Agent.find({
        isActive: true,
        _id: { $ne: agentId }
      });

      if (activeAgents.length) {

        // redistribute tasks
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

module.exports = {
  addAgent,
  getAgents,
  getTasks,
  getMyProfile,
  deactivateAgent
};
