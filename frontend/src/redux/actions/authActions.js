import api from "../../api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_PROFILE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import { toast } from "react-toastify";

// LOGIN
export const postLoginData = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await api.post("/api/auth/login", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("token", data.token);
    toast.success(data.msg || "Login successful");
  } catch (error) {
    const msg = error.response?.data?.msg || error.message || "Login failed";

    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg },
    });

    toast.error(msg);
  }
};

// SIGNUP
export const postSignupData = (name, email, password) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await api.post("/api/auth/signup", {
      name,
      email,
      password,
    });

    dispatch({ type: SIGNUP_SUCCESS });
    toast.success(data.msg || "Signup successful");
  } catch (error) {
    const msg = error.response?.data?.msg || error.message || "Signup failed";

    dispatch({
      type: SIGNUP_FAILURE,
      payload: { msg },
    });

    toast.error(msg);
  }
};

// GET PROFILE
export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("/api/profile", {
      headers: { Authorization: token },
    });

    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });
  } catch (error) {
    console.warn("Failed to load profile", error);
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  document.location.href = "/";
};
