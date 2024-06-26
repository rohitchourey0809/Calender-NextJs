import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/outline";
import { baseapi } from "../api";
import { toast } from "react-toastify";

const EventCalendar = ({ initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(() => {
    const startDate = moment(selectedDate).startOf("week");
    const endDate = moment(selectedDate).endOf("week");

    axios
      .get(`${baseapi}/tasks?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        toast.success("Successfully get data");
        console.log("response.data", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [selectedDate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = async () => {
    if (!newTask || !selectedDate) return;

    const taskData = {
      title: newTask,
      date: selectedDate,
    };

    try {
      const response = await axios.post(`${baseapi}/tasks`, taskData);
      toast.success("Data Added Succesfully");
      const addedTask = response.data;

      if (moment(addedTask.date).isSame(selectedDate, "day")) {
        setTasks([...tasks, addedTask]);
      }

      setNewTask("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = (taskId) => {
    console.log("taskId", taskId);
    axios
      .delete(`${baseapi}/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        toast.success("Data Deleted Succesfully");
        console.log("updatedTasks", updatedTasks);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handlePrevWeek = () => {
    setSelectedDate(moment(selectedDate).subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setSelectedDate(moment(selectedDate).add(1, "week"));
  };

  const currentWeek = [];
  const startDate = moment(selectedDate).startOf("week");

  for (let i = 0; i < 7; i++) {
    currentWeek.push(startDate.clone().add(i, "days"));
  }

  console.log("tasks[selectedDate]", tasks);
  console.log("selectedDate", selectedDate);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-4 border-b-2 pb-4 mb-4">
        <button
          onClick={handlePrevWeek}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Previous Week
        </button>
        <h2 className="text-xl font-bold">{startDate.format("MMMM YYYY")}</h2>
        <button
          onClick={handleNextWeek}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-9 rounded"
        >
          Next Week
        </button>
      </div>
      <div className="flex flex-wrap justify-center align-center gap-4">
        {currentWeek.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className="w-1/7 border rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-md"
          >
            <h3 className="text-lg font-normal mb-2">{day.format("dddd")}</h3>
            <p className="mb-2">{day.format("MMM DD")}</p>
            <button
              onClick={() => {
                setSelectedDate(day.format("YYYY-MM-DD"));
                setIsModalOpen(true);
              }}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add Task
            </button>

            {tasks.some((task) => moment(task.date).isSame(day, "day")) && (
              <ul className="border rounded p-2">
                {tasks
                  .filter((task) => moment(task.date).isSame(day, "day"))
                  .map((task) => (
                    <li
                      key={task._id}
                      className="flex justify-between items-center mb-1"
                    >
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="text-gray-500 bg-transparent"
                      >
                        <CheckIcon
                          className={`h-6 w-6 ${
                            task.completed
                              ? "text-green-500 rounded-full"
                              : "text-red-500 rounded-full"
                          }`}
                        />
                      </button>
                      <span
                        className={`${
                          task.completed ? "line-through text-green-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 bg-transparent border border-solid border-red-500 rounded px-3 py-1 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Add Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task"
              className="border px-2 py-1 mb-2 text-green-600"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Add
            </button>
            <button
              onClick={() => {
                setNewTask("");
                setIsModalOpen(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
