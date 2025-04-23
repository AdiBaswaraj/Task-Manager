import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const handleLogoutClick = () => dispatch(logout());

  const AuthLinks = () => (
    <>
      <li className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">
        <Link to="/tasks/add" className="block px-4 py-2 w-full h-full">
          <i className="fa-solid fa-plus mr-2"></i> Add Task
        </Link>
      </li>
      <li
        onClick={handleLogoutClick}
        className="py-2 px-3 cursor-pointer text-red-400 hover:bg-zinc-700 transition rounded-sm"
      >
        Logout
      </li>
    </>
  );

  const GuestLinks = () => (
    <li className="py-2 px-3 cursor-pointer text-blue-400 hover:bg-zinc-700 transition rounded-sm">
      <Link to="/login">Login</Link>
    </li>
  );

  return (
    <header className="sticky top-0 z-40 p-4 bg-zinc-900 text-white shadow-md flex justify-between items-center">
      <h2 className="cursor-pointer uppercase font-bold text-lg tracking-wide">
        <Link to="/" className="hover:text-blue-400">Task Manager</Link>
      </h2>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-4 uppercase font-medium items-center">
        {isLoggedIn ? <AuthLinks /> : <GuestLinks />}
      </ul>

      {/* Hamburger Icon */}
      <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
        <i className="fa-solid fa-bars text-xl"></i>
      </span>

      {/* Mobile Slide-In Nav */}
      <div
        className={`absolute md:hidden top-0 right-0 w-screen sm:w-8/12 h-screen bg-zinc-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isNavbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavbar}>
            <i className="fa-solid fa-xmark text-2xl text-white"></i>
          </button>
        </div>

        <ul className="flex flex-col items-center gap-4 uppercase font-medium">
          {isLoggedIn ? <AuthLinks /> : <GuestLinks />}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
