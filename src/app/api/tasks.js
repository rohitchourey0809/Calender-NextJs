import mongoose from "mongoose";

// MongoDB URI
const mongoURI =
  "mongodb+srv://rohit1995chourey:rohit321@nodeapp.r62ctns.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Define the Task model
const Task = mongoose.model("Task", {
  title: String,
  date: String,
  completed: Boolean,
});

// GET /api/tasks
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, date, completed } = req.body;
      const newTask = new Task({ title, date, completed });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "PUT") {
    // Handle PUT request
  } else if (req.method === "DELETE") {
    // Handle DELETE request
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}


