import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
const ProblemPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchProblems = async () => {
    try {
      const response = await axiosInstance.get("/problem");
      setProblems(response.data.problems);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError("Failed to load problems.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading problems...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Reported Problems
      </h1>

      {problems.length === 0 ? (
        <div className="text-center text-gray-500">
          No problems reported yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {problem.image_url && (
                <img
                  src={problem.image_url}
                  alt="Problem"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex flex-col justify-between gap-2 items-start">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {problem.location}
                  </h2>
                  <p className="text-gray-600 mb-2">{problem.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  {/* <NavLink
                    to={`/problem/${problem._id}?userId=${problem.user_id._id}`}
                  >
                    <button className="px-2 py-1 cursor-pointer bg-red-400 text-white rounded-md text-xl">
                      <GrFormView />
                    </button>
                  </NavLink> */}
                  <NavLink
                    to={`/problem/${problem._id}?userId=${problem.user_id._id}`}
                  >
                    <button className="px-2 py-1 cursor-pointer bg-green-400 text-white rounded-md text-sm">
                      Show Solution
                    </button>
                  </NavLink>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    Reported by:{" "}
                    <span className="font-medium">{problem.user_id.name}</span>
                  </div>
                  <div>{new Date(problem.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
