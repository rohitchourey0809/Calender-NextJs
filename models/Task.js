// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
