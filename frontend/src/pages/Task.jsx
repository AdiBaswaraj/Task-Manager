import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";

const Task = () => {
  const { token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [fetchData, { loading }] = useFetch();
  const mode = taskId === undefined ? "add" : "update";

  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/api/tasks/${taskId}`,
        method: "get",
        headers: { Authorization: token },
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        if (data?.task) {
          setTask(data.task);
          setFormData({ description: data.task.description });
        }
      });
    }
  }, [mode, token, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ description: task?.description || "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateManyFields("task", formData);
    if (errors.length > 0) {
      const mapped = errors.reduce((acc, ob) => {
        acc[ob.field] = ob.err;
        return acc;
      }, {});
      setFormErrors(mapped);
      return;
    }

    setFormErrors({});

    const config = {
      url: mode === "add" ? "/api/tasks" : `/api/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: token },
    };

    fetchData(config).then(() => {
      navigate("/", { state: { refresh: true } });
    });
  };

  const fieldError = (field) =>
    formErrors[field] && (
      <p className="mt-1 text-sm text-red-400">
        <i className="fa-solid fa-circle-exclamation mr-1"></i>
        {formErrors[field]}
      </p>
    );

  return (
    <MainLayout>
      <div className="flex items-center justify-center px-4 py-10 bg-gradient-to-b from-zinc-900 to-black text-white">
        <form
          className="w-full max-w-2xl bg-zinc-800 p-8 rounded-xl shadow-md"
          onSubmit={handleSubmit}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">
                {mode === "add" ? "Add New Task" : "Update Task"}
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block font-medium mb-2 text-zinc-300 after:content-['*'] after:text-red-500"
                >
                  Description
                </label>
                <Textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write your task here..."
                  onChange={handleChange}
                  className="bg-zinc-700 text-white placeholder-zinc-400"
                />
                {fieldError("description")}
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                >
                  {mode === "add" ? "Add Task" : "Update Task"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition"
                >
                  Cancel
                </button>

                {mode === "update" && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default Task;
