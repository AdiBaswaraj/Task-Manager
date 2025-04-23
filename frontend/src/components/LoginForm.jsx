import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";
import { postLoginData } from "../redux/actions/authActions";

const LoginForm = ({ redirectUrl = "/" }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      const safeRedirect = typeof redirectUrl === "string" ? redirectUrl : "/";
      navigate(safeRedirect);
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);

    if (errors.length > 0) {
      const errObj = errors.reduce((acc, ob) => {
        acc[ob.field] = ob.err;
        return acc;
      }, {});
      setFormErrors(errObj);
      return;
    }

    setFormErrors({});
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) =>
    formErrors[field] && (
      <p className="mt-1 text-sm text-red-400">
        <i className="mr-2 fa-solid fa-circle-exclamation"></i>
        {formErrors[field]}
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-zinc-800 p-8 rounded-xl shadow-xl text-white"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-6 text-2xl font-semibold">Log in</h2>

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
            <Link to="/signup" className="text-blue-400 hover:underline">
              Don't have an account? Sign up here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
