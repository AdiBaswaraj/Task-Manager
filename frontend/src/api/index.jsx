import axios from "axios";

const api = axios.create({
  baseURL: "/api", // This can be replaced by an environment variable for flexibility
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // useful if you're using cookies/session-based auth
});

// Optional: Add interceptors for global error handling or token injection
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
