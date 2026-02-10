const parseFile = require("../utils/fileParser");
const distributeTasks = require("../services/distributionService");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File is required",
      });
    }

    const allowedExtensions = [".csv", ".xlsx", ".xls"];

    const isValidFile = allowedExtensions.some(ext =>
      req.file.originalname.toLowerCase().endsWith(ext)
    );

    if (!isValidFile) {
      return res.status(400).json({
        message: "Only CSV, XLSX or XLS files are allowed",
      });
    }

    const data = await parseFile(req.file.path);

    if (!data.length) {
      return res.status(400).json({
        message: "File is empty",
      });
    }

    const requiredHeaders = ["FirstName", "Phone", "Notes"];
    const fileHeaders = Object.keys(data[0]);

    const isValid = requiredHeaders.every(h =>
      fileHeaders.includes(h)
    );

    if (!isValid) {
      return res.status(400).json({
        message:
          "Invalid format. Required headers: FirstName, Phone, Notes",
      });
    }

    // ✅ ONLY ACTIVE AGENTS
    const agents = await Agent.find({ isActive: true });

    if (!agents.length) {
      return res.status(400).json({
        message: "No active agents available",
      });
    }

    const distributedData = distributeTasks(data, agents);

    const tasksToInsert = distributedData.map(task => ({
      FirstName: task.FirstName,
      Phone: task.Phone,
      Notes: task.Notes,
      agent: task.agent
    }));

    await Task.insertMany(tasksToInsert);

    res.json({
      message: "Tasks distributed successfully",
      totalTasks: tasksToInsert.length
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { uploadAndDistribute };
