// Import necessary modules
const express = require("express");
const tasksRouter = require("./src/api/tasks");

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the tasks router at the /api/tasks endpoint
app.use("/api/tasks", tasksRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
