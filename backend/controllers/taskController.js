const Task = require("../models/Task");
const Agent = require("../models/Agent");

const getMyTasks = async (req, res) => {
  try {
    const agent = await Agent.findOne({
      email: req.user.email
    });

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    const tasks = await Task.find({
      agent: agent._id
    })
      .populate("agent", "name email mobile") 
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getTasksByAgentId = async (req, res) => {
  try {
    const tasks = await Task.find({
      agent: req.params.agentId
    })
      .populate("agent", "name email mobile")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/tasks
const deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getMyTasks, getTasksByAgentId, deleteTask, deleteAllTasks };
