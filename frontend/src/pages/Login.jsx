import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import MainLayout from "../layouts/MainLayout";

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Login | Task Manager";
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-zinc-900 to-black text-white rounded-lg shadow-inner">
        <div className="max-w-lg w-full bg-zinc-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Sign in to your account</h2>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Enter your credentials to manage tasks efficiently and stay productive.
          </p>
          <LoginForm redirectUrl={redirectUrl} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
