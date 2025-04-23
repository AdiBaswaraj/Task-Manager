import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateManyFields("signup", formData);
    if (errors.length > 0) {
      const errMap = errors.reduce((acc, ob) => {
        acc[ob.field] = ob.err;
        return acc;
      }, {});
      setFormErrors(errMap);
      return;
    }

    setFormErrors({});

    try {
      await fetchData({
        url: "/api/auth/signup", // ✅ Fixed here
        method: "post",
        data: formData,
      });
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const fieldError = (field) =>
    formErrors[field] && (
      <p className="mt-1 text-sm text-red-400">
        <i className="fa-solid fa-circle-exclamation mr-1"></i>
        {formErrors[field]}
      </p>
    );

  return (
    <form
      className="w-full max-w-md mx-auto my-16 bg-zinc-800 p-8 rounded-xl shadow-xl text-white"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-6 text-2xl font-semibold">
            Create your account
          </h2>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block font-medium text-zinc-300 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Your name"
              onChange={handleChange}
            />
            {fieldError("name")}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block font-medium text-zinc-300 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Email
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="youremail@domain.com"
              onChange={handleChange}
            />
            {fieldError("email")}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-medium text-zinc-300 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password..."
              onChange={handleChange}
            />
            {fieldError("password")}
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-medium w-full py-2 rounded-md transition"
          >
            Submit
          </button>

          <div className="pt-6 text-center text-sm text-zinc-400">
            <Link to="/login" className="text-blue-400 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default SignupForm;
