const { loginUser, registerUser, logoutUser } = require("../controllers/auth.controller");
const express = require("express")
const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);


module.exports = authRoutes;
