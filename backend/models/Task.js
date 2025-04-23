const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  reminder: {
    type: Date,
    default: null,
  },
  category: {
    type: String,
    default: "general",
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "overdue"],
    default: "pending",
  },
  repeatCount: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
