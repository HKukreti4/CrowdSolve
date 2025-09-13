const asyncHandler = require("../utils/asyncHandler.utility");
const errorHandler = require("../utils/error.utility");

const Solution = require("../models/solution.model").Solution;
const Comment = require("../models/comment.model").Comment;

// Get solutions for a problem with their comments
const getSolutions = async (req, res) => {
    try {
        const { problem_id } = req.query;

        // Find all solutions for the problem
        const solutions = await Solution.find({ problem_id })
            .populate("user_id", "name"); // Populate user info

        // For each solution, fetch its comments
        const solutionsWithComments = await Promise.all(
            solutions.map(async (solution) => {
                const comments = await Comment.find({ solution_id: solution._id })
                    .populate("user_id", "name")
                    .sort({ created_at: -1 });
                return {
                    _id: solution._id,
                    problem_id: solution.problem_id,
                    user_id: solution.user_id,
                    description: solution.description,
                    upvotes: solution.upvotes,
                    created_at: solution.created_at,
                    comments: comments
                };
            })
        );

        return res.json({ solutions: solutionsWithComments });
    } catch (error) {
        console.error("Error fetching solutions:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Upvote a solution
const upvoteSolution = async (req, res) => {
    try {
        const { id } = req.params;
        const solution = await Solution.findById(id);
        if (!solution) {
            return res.status(404).json({ message: "Solution not found." });
        }
        solution.upvotes += 1;
        await solution.save();
        return res.json({ upvotes: solution.upvotes });
    } catch (error) {
        console.error("Error upvoting solution:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Add a comment to a solution
const addComment = async (req, res) => {
    try {
        const { id } = req.params; // solution ID
        const { comment_text } = req.body;
        const user_id = req.user._id;

        const solution = await Solution.findById(id);
        if (!solution) {
            return res.status(404).json({ message: "Solution not found." });
        }

        const comment = new Comment({
            solution_id: id,
            user_id,
            comment_text
        });

        await comment.save();

        // Populate user info
        const populatedComment = await Comment.findById(comment._id).populate("user_id", "name");

        return res.status(201).json({ comment: populatedComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const addSolution = asyncHandler(async (req, res, next) => {
    const { problem_id, description } = req.body;
    const user_id = req.user._id;
    if (!description || !problem_id) {
        return next(new errorHandler({ message: "Problem and description are required." }));
    }

    const solution = new Solution({ problem_id, user_id, description });
    await solution.save();

    return res.status(201).json({ solution });
}
);

module.exports = {
    getSolutions,
    upvoteSolution,
    addComment,
    addSolution
};
