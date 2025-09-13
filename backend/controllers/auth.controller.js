const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler.utility");
const errorHandler = require("../utils/error.utility");
const jwt = require("jsonwebtoken");
const { checkPass } = require("../utils/password.compare");

// * Login controller
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new errorHandler("Email or password does not exist", 404));
  }

  const result = await checkPass(password, user.password);
  if (!result) {
    return next(new errorHandler("Email or password is incorrect", 401));
  }
  const payload = {
    id: user._id,
    email: user.email,
  };
  const secret = process.env.SECRET_KEY || "1d";
  if (!secret) {
    return next(new errorHandler("SECRET_KEY is not defined", 500));
  }

  const expiry = process.env.JWT_EXPIRY || "1d";
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Successful login",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
});

//* Register Controller
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    return next(new errorHandler("All fields are required", 404));
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return next(new errorHandler("User already exist. Login to continue", 404));
  }
  const newUser = new User({
    name,
    email,
    avatar,
    password,
  });
  const savedUser = await newUser.save();
  if (!savedUser) {
    return next(new errorHandler("Failed to create the new user", 401));
  }
  const payload = {
    id: savedUser._id,
    email: savedUser.email,
  };
  const secret = process.env.SECRET_KEY || "1d";
  if (!secret) {
    return next(
      new errorHandler(
        "SECRET_KEY is not defined in environment variables",
        404
      )
    );
  }
  const expiry = process.env.JWT_EXPIRY || "1d";
  const options = {
    expiresIn: expiry,
  };
  const token = jwt.sign(payload, secret, options);
  res.status(200).json({
    message: "Successfully created the user",
    user: {
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id,
    },
    token: token,
  });
});


const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),

  });

  res.status(200).json({
    message: "Logged out successfully",
    success: true
  });
};



module.exports = { loginUser, registerUser, logoutUser };
