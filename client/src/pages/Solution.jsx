import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const SolutionPage = () => {
  const { problemId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({});

  const fetchSolutions = async () => {
    try {
      const res = await axiosInstance.get(`/solution?problem_id=${problemId}`);
      setSolutions(res.data.solutions);
    } catch (error) {
      console.error("Failed to load solutions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [problemId]);

  const handleUpvote = async (solutionId) => {
    try {
      const res = await axiosInstance.post(`/solution/upvote/${solutionId}`);
      setSolutions((prev) =>
        prev.map((sol) =>
          sol._id === solutionId ? { ...sol, upvotes: res.data.upvotes } : sol
        )
      );
    } catch {
      toast.error("Failed to upvote.");
    }
  };

  const handleCommentSubmit = async (solutionId) => {
    const comment = commentInputs[solutionId];
    if (!comment || comment.trim() === "") {
      toast.error("Comment cannot be empty.");
      return;
    }
    try {
      const res = await axiosInstance.post(`/solution/comment/${solutionId}`, {
        comment_text: comment,
      });
      setSolutions((prev) =>
        prev.map((sol) =>
          sol._id === solutionId
            ? { ...sol, comments: [...sol.comments, res.data.comment] }
            : sol
        )
      );
      setCommentInputs((prev) => ({ ...prev, [solutionId]: "" }));
      toast.success("Comment added.");
    } catch {
      toast.error("Failed to add comment.");
    }
  };

  const handleAddSolution = () => {
    navigate(`/add-solution/${problemId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading solutions...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 mt-20 mb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Solutions</h1>
        {user.id !== userId && (
          <button
            onClick={handleAddSolution}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Solution
          </button>
        )}
      </div>

      {solutions.length === 0 ? (
        <div className="text-center text-gray-500 p-6 bg-gray-50 rounded shadow-sm">
          No solutions found for this problem.
        </div>
      ) : null}

      <div className="space-y-6">
        {[...solutions]
          .sort((a, b) => b.upvotes - a.upvotes)
          .map((solution) => (
            <div
              key={solution._id}
              className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-700">{solution.description}</p>
                <button
                  onClick={() => handleUpvote(solution._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  ↑ Upvote ({solution.upvotes})
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Comments</h4>
                {solution.comments.length > 0 ? (
                  <div className="space-y-3">
                    {solution.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="border p-3 rounded bg-gray-50 flex justify-between items-center"
                      >
                        <p className="text-gray-600">{comment.comment_text}</p>
                        <span className="text-sm text-gray-500">
                          ↑ {comment.upvotes || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={commentInputs[solution._id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [solution._id]: e.target.value,
                    }))
                  }
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleCommentSubmit(solution._id)}
                  className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Post Comment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SolutionPage;
