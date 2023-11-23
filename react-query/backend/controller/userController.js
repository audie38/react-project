const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const { RESP_CODE_OK, RESP_STATUS_OK } = require("../config/const");
const { Op } = require("sequelize");
const { encryptPassword, validatePassword } = require("../utils/helper");
const generateToken = require("../utils/generateToken");

// @desc    Register New User
// @route   POST /api/v2/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, displayName, email, password, photo } = req.body;
  if (!username || !displayName || !password) {
    return res.status(400).json({ message: "Incomplete Data" });
  }
  const userExists = await User.findOne({
    where: {
      [Op.or]: [
        {
          username: username,
        },
        {
          email: email || "",
        },
      ],
    },
  });
  if (userExists) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const newUser = await User.create({
    username: username,
    displayName: displayName,
    email: email ? email : null,
    password: await encryptPassword(password),
    photo: photo,
  });
  if (newUser) {
    generateToken(res, newUser.username);
    return res.status(201).json({
      code: RESP_CODE_OK,
      status: RESP_STATUS_OK,
      message: "Success",
    });
  }
});

// @desc    Update User
// @route   PUT /api/v2/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req.user?.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Exists" });
  }
  const { displayName, email, password, photo } = req.body;
  existingUser.displayName = displayName || existingUser.displayName;
  if (email) {
    existingUser.email = email;
  }
  if (password) {
    existingUser.password = await encryptPassword(password);
  }

  if (photo != undefined || photo != null) {
    if (existingUser?.photo !== null && existingUser?.photo !== "") {
      const rawLocation = existingUser?.photo.replace(`${req.get("host")}/api/v2/asset/img/`, "");

      const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
      if (fs.existsSync(deletedImgPath)) {
        await fs.promises.unlink(deletedImgPath, (err) => {
          if (err) {
            return res.status(500).json({ message: err });
          }
        });
      }
    }
    existingUser.photo = photo;
  }

  const updatedUser = await existingUser.save();
  return res.status(200).json({
    code: RESP_CODE_OK,
    status: RESP_STATUS_OK,
    data: {
      userId: updatedUser?.userId,
      displayName: updatedUser?.displayName,
      email: updatedUser?.email,
      username: updatedUser?.username,
      photo: updatedUser?.photo,
    },
  });
});

// @desc    Delete User
// @route   DELETE /api/v2/user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req.user.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Registered" });
  }
  let isImageDeleted = true;
  if (existingUser?.photo !== null && existingUser?.photo !== "") {
    const rawLocation = existingUser?.photo.replace(`${req.get("host")}/api/v2/asset/img/`, "");
    const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
    if (fs.existsSync(deletedImgPath)) {
      await fs.promises.unlink(deletedImgPath, (err) => {
        if (err) {
          isImageDeleted = false;
          return res.status(500).json({ message: err });
        }
      });
    }
  }
  if (isImageDeleted) {
    const deletedUser = await existingUser.destroy();
    if (deletedUser) {
      return res.status(200).json({
        code: RESP_CODE_OK,
        status: RESP_STATUS_OK,
      });
    }
  }
  return res.status(500).json({ message: "Failed to Delete User" });
});

// @desc    User Login Auth
// @route   POST /api/v2/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return res.status(401).json({ message: "Credentials Cannot be empty" });
  }
  const userExists = await User.findOne({
    where: {
      [Op.or]: [{ username: account }, { email: account }],
    },
  });
  if (userExists) {
    const validPassword = await validatePassword(password, userExists.password);
    if (validPassword) {
      generateToken(res, userExists.username);
      return res.status(200).json({
        code: RESP_CODE_OK,
        status: RESP_STATUS_OK,
        message: "Login Success",
      });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  return res.status(404).json({ message: "User Not Registered" });
});

// @desc    User Logout
// @route   POST /api/v2/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    code: RESP_CODE_OK,
    status: RESP_STATUS_OK,
    message: "Logout Success",
  });
});

// @desc    Success Auth
// @route   GET /api/v2/user
// @access  Private
const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      code: RESP_CODE_OK,
      status: RESP_STATUS_OK,
      data: {
        userId: req.user?.userId,
        displayName: req.user?.displayName,
        email: req.user?.email,
        username: req?.user?.username,
        photo: req?.user?.photo,
      },
    });
  }
});

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
  successLoginHandler,
};
