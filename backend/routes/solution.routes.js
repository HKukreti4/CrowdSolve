const express = require("express");

const { checkLogin } = require("../middleware/auth.check");
const { getSolutions, upvoteSolution, addComment, addSolution } = require("../controllers/solution.model");
const solutionRoutes = express.Router()

solutionRoutes.get("/", checkLogin, getSolutions);
solutionRoutes.post("/", checkLogin, addSolution);

// Upvote a solution
solutionRoutes.post("/upvote/:id", checkLogin, upvoteSolution);

// Add a comment to a solution
solutionRoutes.post("/comment/:id", checkLogin, addComment);


module.exports = solutionRoutes