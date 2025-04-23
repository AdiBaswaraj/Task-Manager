import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { saveProfile } from "./redux/actions/authActions";

function App() {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(saveProfile(token));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/tasks/add"
          element={
            isLoggedIn ? (
              <Task />
            ) : (
              <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
            )
          }
        />

        <Route
          path="/tasks/:taskId"
          element={
            isLoggedIn ? (
              <Task />
            ) : (
              <Navigate
                to="/login"
                state={{ redirectUrl: window.location.pathname }}
              />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
