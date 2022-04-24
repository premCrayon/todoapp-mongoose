const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
taskSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
module.exports = mongoose.model("task", taskSchema);
