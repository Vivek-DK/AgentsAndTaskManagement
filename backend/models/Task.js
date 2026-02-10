const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Notes: {
      type: String,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
