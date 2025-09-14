import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const ProblemUpload = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !description) {
      setMessage("Location and description are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("location", location);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/problem/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      toast.success(response.data.message);
      setLocation("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading problem:", error);
      toast.error(error.response?.data?.message || "Failed to upload problem.");
      setMessage(error.response?.data?.message || "Failed to upload problem.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-25">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Report a Problem
      </h2>

      {message && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the problem in detail..."
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default ProblemUpload;
