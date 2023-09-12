const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const { Op } = require("sequelize");

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

const verifyPassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

// @desc    Register New User
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    return res.status(201).json({
      data: {
        userId: newUser.userId,
        token: generateToken(res, newUser.userId),
      },
    });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});

// @desc    Update User
// @route   PUT /api/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req?.user?.userId);
  if (!existingUser) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
  existingUser.password = hashedPassword;
  await existingUser.save();

  return res.status(200).json({ message: "User Password Updated" });
});

// @desc    Delete User
// @route   DELETE /api/user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req?.user?.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const deletedUser = await existingUser.destroy();
  if (deletedUser) {
    return res.status(200).json({ message: "User Deleted" });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});

// @desc    User Login
// @route   POST /api/user/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: account }, { username: account }],
    },
  });

  if (existingUser) {
    const validPassword = await verifyPassword(password, existingUser.password);
    if (validPassword) {
      return res.status(200).json({
        data: {
          userId: existingUser.userId,
          token: generateToken(res, existingUser.userId),
        },
      });
    }

    return res.status(401).json({ message: "UnAuthorized" });
  }

  return res.status(404).json({ message: "User Not Registered" });
});

// @desc    User Logout
// @route   POST /api/user/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logout Success" });
});

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  login,
  logout,
};
