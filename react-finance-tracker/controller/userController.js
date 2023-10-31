const Users = require("../model/User");
const asyncHandler = require("express-async-handler");
const uploadFile = require("../middleware/upload");
const generateToken = require("../utils/generateToken");
const { encryptPassword, validatePassword } = require("../utils/helper");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

// @desc Success Auth
// @route GET /api/v1/user/success
// @access Private
const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: {
        userId: req.user?.userId,
        username: req.user?.username,
        name: req.user?.name,
        email: req.user?.email,
        photos: req.user?.photos,
      },
    });
  }
});

// @desc    Register New User
// @route   POST /api/v1/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password, photos } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json({ message: "Please Fill All Required Fields" });
  }
  const userExists = await Users.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });
  if (userExists) {
    return res.status(400).json({ message: "Users Already Exists" });
  }
  const newUser = await Users.create({
    username: username,
    name: name,
    email: email ? email : null,
    password: await encryptPassword(password),
    photos: photos,
  });

  if (newUser) {
    generateToken(res, newUser.username);
    return res.status(201).json({
      success: true,
      message: "Success",
    });
  }
});

// @desc    Login
// @route   POST /api/v1/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return res.status(401).json({ message: "Credentials Cannot be empty" });
  }
  const userExists = await Users.findOne({
    where: {
      [Op.or]: [{ username: account }, { email: account }],
    },
  });
  if (userExists) {
    const validPassword = await validatePassword(password, userExists.password);
    if (validPassword) {
      generateToken(res, userExists.username);
      return res.status(200).json({
        success: true,
        message: "Success",
      });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  return res.status(404).json({ message: "User Not Registered" });
});

// @desc    Logout
// @route   POST /api/v1/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logout Success" });
});

// @desc    Update User
// @route   PUT /api/v1/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await Users.findByPk(req.user.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Registered" });
  }
  const { name, email, password, photos } = req.body;
  if (name) {
    existingUser.name = name;
  }
  if (email) {
    existingUser.email = email;
  }
  if (password) {
    existingUser.password = await encryptPassword(password);
  }
  if (photos) {
    if (existingUser?.photos !== null && existingUser?.photos !== "") {
      const rawLocation = existingUser?.photos.replace(`${req.get("host")}${req.baseUrl}/img/`, "");
      const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
      await fs.promises.unlink(deletedImgPath, (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
      });
    }
    existingUser.photos = photos;
  }

  const updatedUser = await existingUser.save();
  return res.status(200).json({
    success: true,
    message: "Success",
  });
});

// @desc    Delete User
// @route   DELETE /api/v1/user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await Users.findByPk(req.user.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Registered" });
  }
  let isImageDeleted = true;
  if (existingUser?.photos !== null && existingUser?.photos !== "") {
    const rawLocation = existingUser?.photos.replace(`${req.get("host")}${req.baseUrl}/img/`, "");
    const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
    await fs.promises.unlink(deletedImgPath, (err) => {
      if (err) {
        isImageDeleted = false;
        return res.status(500).json({ message: err });
      }
    });
  }

  if (isImageDeleted) {
    const deletedUser = await existingUser.destroy();
    if (deletedUser) {
      return res.status(200).json({
        success: true,
        message: "Success",
      });
    }
  }
  return res.status(500).json({ message: "Failed to Delete User" });
});

// @desc    Upload Event Image
// @route   POST /api/v1/user/upload
// @access  Private
const uploadEventImage = asyncHandler(async (req, res) => {
  try {
    await uploadFile(req, res);
    res.status(200).json({ uploadedFile: `${req.get("host")}${req.baseUrl}/img/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = {
  successLoginHandler,
  registerUser,
  authUser,
  logoutUser,
  updateUser,
  deleteUser,
  uploadEventImage,
};
