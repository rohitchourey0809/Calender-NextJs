"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import EventCalendar from "./components/EventCalender";

export default function Home() {
  const [task, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend API
    axios
      .get("/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleTaskDelete = (taskId) => {
    // Delete task from the backend
    axios
      .delete(`/api/tasks/${taskId}`)
      .then(() => {
        // Update tasks state after successful deletion
        setTasks(task.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };
  return (
    <div className=" flex justify-center items-center h-full">
      <div>
        <h1 className="text-3xl font-bold my-6  text-center">
          Weekly Todo List
        </h1>
        <EventCalendar
          initialDate="2024-04-01"
          task={task}
          onTaskDelete={handleTaskDelete}
        />
      </div>
    </div>
  );
}
