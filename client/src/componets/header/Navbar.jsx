import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // If using react-router for navigation
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
    <nav className="bg-black  text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <span className="font-bold text-xl">CrowdSolve</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/problems" className="hover:text-blue-600">
              Problems
            </Link>
            <Link to="/problem/post" className="">
              <button className="px-2 py-1 bg-red-400 rounded-md cursor-pointer">
                Post a Problem
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1 border rounded hover:bg-gray-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 border rounded hover:bg-blue-100"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
