import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // If using react-router for navigation
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null); // ✅ clear user from context
      toast.success("Logged out successfully");
      navigate("/login"); // ✅ redirect if needed
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            C
          </div>
          <h1 className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
            CrowdSolve
          </h1>
        </div>
        <nav className="space-x-6 hidden md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-indigo-600 font-medium ${
                isActive ? "text-indigo-600 underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          {user ? (
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `text-gray-700 hover:text-indigo-600 font-medium ${
                  isActive ? "text-indigo-600 underline" : ""
                }`
              }
            >
              Problems
            </NavLink>
          ) : null}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-700 hover:text-indigo-600 font-medium ${
                isActive ? "text-indigo-600 underline" : ""
              }`
            }
          >
            About
          </NavLink>
        </nav>
        {user ? (
          <div>
            <NavLink
              to="/problem/post"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Post a problem
            </NavLink>{" "}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-100 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <NavLink
              to="/login"
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-100 transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Register
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
