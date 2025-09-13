import React, { useState } from "react";
import axios from "axios";
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

      const token = localStorage.getItem("token"); // assuming token is stored in localStorage

      const response = await axiosInstance.post("/problem/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // if your backend uses Bearer token
        },
      });

      setMessage(response.data.message);
      toast.success(response.data.message);
      setLocation("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading problem:", error);
      toast.error(error.response?.data?.message);
      setMessage(error.response?.data?.message || "Failed to upload problem.");
    }
  };

  return (
    <div className="max-w-md mx-auto  p-4 border rounded shadow  min-h-[75vh]">
      <h2 className="text-xl font-bold mb-4">Upload a Problem</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProblemUpload;
