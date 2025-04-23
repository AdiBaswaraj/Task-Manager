import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-zinc-900 to-black text-white">
        <h1 className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-xl text-zinc-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </h2>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-400 transition underline font-medium text-sm"
        >
          ← Return to Dashboard
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
