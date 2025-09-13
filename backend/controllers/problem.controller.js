
const Problem = require('../models/problem.model.js');

const uploadProblem = async (req, res) => {
    try {
        const { location, description } = req.body;
        const userId = req.user._id;

        if (!location || !description) {
            return res.status(400).json({ message: 'Location and description are required.' });
        }

        let imageUrl = null;
        if (req.file) {
            // Save relative path to image_url
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const problem = new Problem({
            user_id: userId,
            location,
            description,
            image_url: imageUrl
        });

        await problem.save();

        return res.status(201).json({
            message: 'Problem uploaded successfully.',
            problem
        });
    } catch (error) {
        console.error('Error uploading problem:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getProblems = async (req, res) => {
    try {
        // Fetch all problems from the database
        const problems = await Problem.find()
            .populate('user_id', 'name email') // Populate user info if you want
            .sort({ created_at: -1 }); // Sort by newest first

        return res.status(200).json({
            message: 'Problems fetched successfully.',
            problems
        });
    } catch (error) {
        console.error('Error fetching problems:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getSolutions = async (req, res) => {
    try {
        const { problem_id } = req.query;
        const solutions = await Solution.find({ problem_id })
            .populate("user_id", "name") // Populate user name
            .populate("comments.user_id", "name"); // Populate comment authors
        return res.json({ solutions });
    } catch (error) {
        console.error("Error fetching solutions:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

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

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment_text } = req.body;
        const user_id = req.user._id;

        const solution = await Solution.findById(id);
        if (!solution) {
            return res.status(404).json({ message: "Solution not found." });
        }

        const newComment = {
            user_id,
            comment_text,
        };

        solution.comments.push(newComment);
        await solution.save();

        // Populate user name in the new comment
        const populatedSolution = await Solution.findById(id)
            .populate("comments.user_id", "name");

        const addedComment = populatedSolution.comments.slice(-1)[0]; // Get the last comment

        return res.status(201).json({ comment: addedComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    uploadProblem, getProblems
};
