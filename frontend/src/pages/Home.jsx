import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    document.title = isLoggedIn ? `${user?.name || "User"}'s Tasks` : "Task Manager";
  }, [isLoggedIn, user]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <section className="h-[60vh] flex flex-col items-center justify-center text-center text-white px-4 bg-gradient-to-b from-zinc-900 to-black">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Manage your day with clarity and control
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl">
            Plan, track, and complete your tasks efficiently — all in one sleek dashboard.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full text-lg font-medium shadow-md"
          >
            Get Started
          </Link>
        </section>
      ) : (
        <>
          <div className="mx-4 md:mx-8 mt-6">
            <h1 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">
              Welcome back, {user?.name || "User"}
            </h1>
          </div>
          <Tasks />
        </>
      )}
    </MainLayout>
  );
};

export default Home;
