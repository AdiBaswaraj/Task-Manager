import React, { useEffect } from "react";
import SignupForm from "../components/SignupForm";
import MainLayout from "../layouts/MainLayout";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup | Task Manager";
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-zinc-900 to-black text-white">
        <div className="max-w-lg w-full bg-zinc-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Create your account</h2>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Join our task manager and take control of your day with clarity.
          </p>
          <SignupForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
