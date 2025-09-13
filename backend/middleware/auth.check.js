const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Adjust path as needed
const errorHandler = require("../utils/error.utility"); // Custom error handler

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(new errorHandler("Not authorized, token missing", 401));
        }
        const secret = process.env.SECRET_KEY || "default_secret";
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return next(new errorHandler("User not found", 404));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new errorHandler("Not authorized, token invalid", 401));
    }
};

module.exports = { protect };
