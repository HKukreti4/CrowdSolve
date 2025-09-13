
const express = require("express");
const { uploadProblem, getProblems } = require("../controllers/problem.controller");
const upload = require("../utils/uploadFile.utility");
const { checkLogin } = require("../middleware/auth.check");
const problemRoutes = express.Router();

problemRoutes.post("/problem/create", checkLogin, upload.single("image"), uploadProblem);
problemRoutes.get("/problem", checkLogin, getProblems);



module.exports = problemRoutes;
