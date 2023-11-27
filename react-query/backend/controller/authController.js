const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_BASE_URL;
const { RESP_CODE_OK, RESP_STATUS_OK } = require("../config/const");

const generateToken = require("../utils/generateToken");

// @desc    Success Github OAuth Login Feedback
// @route   GET /auth/login/success
// @access  Public
const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    generateToken(res, req.user.username);
    const userExists = await User.findOne({
      where: {
        username: req.user.username,
      },
    });
    if (!userExists) {
      return res.status(401).json({
        success: false,
        message: "Failed",
      });
    }
    return res.status(200).json({
      code: RESP_CODE_OK,
      status: RESP_STATUS_OK,
      data: {
        userId: userExists?.userId,
        displayName: userExists?.displayName,
        email: userExists?.email,
        username: userExists?.username,
        photo: userExists?.photo,
      },
    });
  }
});

// @desc    Failed Github OAuth Login Feedback
// @route   GET /auth/login/failed
// @access  Public
const failedLoginHandler = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

// @desc    Github OAuth Logout
// @route   GET /auth/logout
// @access  Public
const logoutHandler = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  req.logOut();
  res.redirect(CLIENT_URL);
});

const githubLoginHandler = passport.authenticate("github", { scope: ["profile"] });
const githubLoginCallbackHandler = passport.authenticate("github", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed",
});

module.exports = {
  successLoginHandler,
  failedLoginHandler,
  logoutHandler,
  githubLoginHandler,
  githubLoginCallbackHandler,
};
