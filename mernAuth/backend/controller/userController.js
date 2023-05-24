import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../model/users.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (validPassword) {
      generateToken(res, userExists.userId);
      return res.status(201).json({ _id: userExists.userId, name: userExists.name, email: userExists.email, message: "Login Success" });
    }
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  res.status(404);
  throw new Error("Invalid Email or Password");
});

// @desc    Register User
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    generateToken(res, newUser.userId);
    return res.status(201).json({ _id: newUser.userId, name: newUser.name, email: newUser.email, message: "Register User" });
  }
  res.status(400);
  throw new Error("Invalid User Data");
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
});

// @desc    Get User Profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user.userId,
    name: req.user.name,
    email: req.user.email,
  };
  return res.status(200).json(user);
});

// @desc    Update User Profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userExists = await User.findByPk(req.user.userId);
  if (!userExists) {
    res.status(404);
    throw new Error("User Not Found");
  }

  userExists.name = req.body.name || userExists.name;
  userExists.email = req.body.email || userExists.email;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    userExists.password = hashedPassword;
  }

  const updatedUser = await userExists.save();

  return res.status(200).json({ _id: updatedUser.userId, name: updatedUser.name, email: updatedUser.email });
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
