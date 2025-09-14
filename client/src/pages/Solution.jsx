import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const SolutionPage = () => {
  const { problemId } = useParams(); // Get problem id from route
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({}); // For handling multiple inputs

  const fetchSolutions = async () => {
    try {
      const res = await axiosInstance.get(`/solution?problem_id=${problemId}`);
      setSolutions(res.data.solutions);
    } catch (error) {
      // toast.error("Failed to load solutions.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [problemId, user]);

  const handleUpvote = async (solutionId) => {
    try {
      const res = await axiosInstance.post(`/solution/upvote/${solutionId}`);
      setSolutions((prev) =>
        prev.map((sol) =>
          sol._id === solutionId ? { ...sol, upvotes: res.data.upvotes } : sol
        )
      );
    } catch (error) {
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
    } catch (error) {
      toast.error("Failed to add comment.");
    }
  };

  const handleAddSolution = () => {
    // Redirect to a page or open a modal to add a solution
    navigate(`/add-solution/${problemId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }
  console.log(user, userId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 mt-12 mb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center mb-4">Solutions</h1>
        <div className="text-center space-y-4">
          {user.id !== userId ? (
            <button
              onClick={handleAddSolution}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Solution
            </button>
          ) : null}
        </div>
      </div>

      {solutions.length === 0 ? (
        <p className="text-gray-500">No solutions found for this problem.</p>
      ) : null}
      {[...solutions]
        .sort((a, b) => b.upvotes - a.upvotes)
        .map((solution) => (
          <div
            key={solution._id}
            className="border rounded-md shadow-sm p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-700">{solution.description}</p>
              <button
                onClick={() => handleUpvote(solution._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Upvote ({solution.upvotes})
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Comments</h4>
              <div className="space-y-2">
                {solution.comments && solution.comments.length > 0 ? (
                  solution.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border p-2 rounded bg-gray-50 flex justify-between items-center"
                    >
                      <p>{comment.comment_text}</p>
                      <span className="text-sm text-gray-500">
                        ↑ {comment.upvotes || 0}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
              </div>
            </div>

            <div>
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
                className="w-full border px-3 py-2 rounded-md outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleCommentSubmit(solution._id)}
                className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SolutionPage;
