import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";

const getRemainingTimeInMinutes = (expiresAt) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = (expiry - now) / 60000;
  return Math.max(0, Math.floor(diff));
};

const Tasks = () => {
  const { isLoggedIn, token } = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(async () => {
    try {
      const config = {
        url: "/api/tasks",
        method: "get",
        headers: { Authorization: token },
      };
      const data = await fetchData(config, { showSuccessToast: false });
      setTasks(data?.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }, [token, fetchData]);

  useEffect(() => {
    if (isLoggedIn) fetchTasks();
  }, [isLoggedIn, fetchTasks]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      const config = {
        url: `/api/tasks/${id}`,
        method: "delete",
        headers: { Authorization: token },
      };
      await fetchData(config);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const renderTasks = () => {
    if (loading) return <Loader />;

    if (tasks.length === 0) {
      return (
        <div className="w-full min-h-[200px] flex flex-col items-center justify-center gap-4 text-center text-zinc-400 bg-zinc-800 rounded-lg p-6 shadow-md">
          <span>No tasks found</span>
          <Link
            to="/tasks/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-5 py-2"
          >
            + Add New Task
          </Link>
        </div>
      );
    }

    return tasks.map((task, index) => {
      const remainingMins = task.expiresAt ? getRemainingTimeInMinutes(task.expiresAt) : null;
      const reminderTime = task.reminder ? new Date(task.reminder).toLocaleString() : null;

      return (
        <div
          key={task._id}
          className="bg-zinc-800 my-4 p-5 text-white rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <span className="font-semibold">Task #{index + 1}</span>

            <Tooltip text="Edit this task" position="top">
              <Link
                to={`/tasks/${task._id}`}
                className="ml-auto mr-2 text-green-400 hover:text-green-300"
              >
                <i className="fa-solid fa-pen"></i>
              </Link>
            </Tooltip>

            <Tooltip text="Delete this task" position="top">
              <span
                className="text-red-400 hover:text-red-300 cursor-pointer"
                onClick={() => handleDelete(task._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </span>
            </Tooltip>
          </div>

          <div className="whitespace-pre mt-2 text-zinc-300">{task.description}</div>

          {remainingMins !== null && (
            <p
              className={`text-sm mt-2 font-medium ${
                remainingMins === 0 ? "text-red-500" : "text-yellow-400"
              }`}
            >
              {remainingMins === 0
                ? "Task is overdue"
                : `Time left: ${remainingMins} minute(s)`}
            </p>
          )}

          {reminderTime && (
            <p className="text-sm mt-1 text-blue-400">
              Reminder set for: {reminderTime}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="my-4 mx-auto max-w-[700px] py-4 px-2">
      {tasks.length > 0 && (
        <h2 className="text-xl font-semibold text-zinc-200 mb-2">
          Your Tasks ({tasks.length})
        </h2>
      )}
      {renderTasks()}
    </div>
  );
};

export default Tasks;
