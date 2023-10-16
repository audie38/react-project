const User = require("../models/users");
const uploadFile = require("../middleware/upload");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

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
  const { username, name, profilePicture, email, password } = req.body;
  if (!username || !email || !name || !password) {
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
  let uploadedImage = "none.png";
  if (profilePicture) {
    uploadedImage = profilePicture;
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    name,
    profilePicture: uploadedImage,
  });

  if (newUser) {
    generateToken(res, newUser.userId);
    return res.status(201).json({
      data: {
        userId: newUser.userId,
      },
    });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});

// @desc    Get User Data
// @route   GET /api/user
// @access  Public
const getUserData = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  if (!userId) {
    return res.status(400).json({ message: "UID Required" });
  }

  const response = await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });

  if (!response) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({ data: response });
});

// @desc    Get User Profile Data
// @route   GET /api/user/profile/:uid
// @access  Public
const getProfileData = asyncHandler(async (req, res) => {
  const userId = req.params.uid;
  if (!userId) {
    return res.status(400).json({ message: "UID Required" });
  }

  const response = await User.findOne({
    attributes: {
      exclude: ["password", "username", "userId"],
    },
    where: {
      username: {
        [Op.eq]: userId,
      },
    },
  });

  if (!response) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({ data: response });
});

// @desc    Update User
// @route   PUT /api/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req?.user?.userId);
  if (!existingUser) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  const { password, profilePicture } = req.body;
  if (password) {
    const hashedPassword = await hashPassword(password);
    existingUser.password = hashedPassword;
  }
  if (profilePicture) {
    if (existingUser.profilePicture !== "none.png") {
      const deletedImagePath = path.join(__dirname, "..", "public/uploads/", existingUser.profilePicture);

      await fs.promises.unlink(deletedImagePath, (err) => {
        if (err) {
          logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
          return res.status(500).json({ message: err });
        }
      });
    }
    existingUser.profilePicture = profilePicture;
  }
  await existingUser.save();

  return res.status(200).json({
    message: "User Updated",
  });
});

// @desc    Delete User
// @route   DELETE /api/user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findByPk(req?.user?.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  if (existingUser.profilePicture !== "none.png") {
    const deletedImagePath = path.join(__dirname, "..", "public/uploads/", existingUser.profilePicture);
    await fs.promises.unlink(deletedImagePath, (err) => {
      if (err) {
        logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
        return res.status(500).json({ message: err });
      }
    });
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
      generateToken(res, existingUser.userId);
      return res.status(200).json({
        data: {
          userId: existingUser.userId,
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

// @desc    Upload Event Image
// @route   POST /api/event/upload
// @access  Private
const uploadEventImage = asyncHandler(async (req, res) => {
  try {
    await uploadFile(req, res);
    res.status(200).json({ uploadedFile: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = {
  registerUser,
  getUserData,
  getProfileData,
  updateUser,
  deleteUser,
  login,
  logout,
  uploadEventImage,
};
