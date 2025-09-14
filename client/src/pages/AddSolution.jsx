import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const AddSolutionPage = () => {
  const { problemId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Description cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/solution", {
        problem_id: problemId,
        description,
      });

      if (res.data) {
        toast.success("Solution added successfully!");
        navigate(`/solutions/${problemId}`); // Redirect to solution page
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add solution.");
    } finally {
      setLoading(false);
    }
  };  
  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white shadow rounded-md ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Solution</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your solution..."
          className="w-full border px-4 py-2 rounded-md outline-none focus:border-blue-500 resize-none"
          rows={6}
        />

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-md font-semibold`}
        >
          {loading ? "Submitting..." : "Submit Solution"}
        </button>
      </form>
    </div>
  );
};

export default AddSolutionPage;
