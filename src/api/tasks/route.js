// pages/api/tasks.js
import connectDB from "../../../utils/db";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  console.log("req----->", req);
  await connectDB();

  if (req.method === "GET") {
    try {
      const { date } = req.query;
      const tasks = await Task.find({ date });
      console.log("tasks", tasks);
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, date } = req.body;
      const newTask = new Task({ title, date });
      console.log("newTask", newTask);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
