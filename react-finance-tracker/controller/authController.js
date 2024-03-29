const asyncHandler = require("express-async-handler");
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_BASE_URL;

const generateToken = require("../utils/generateToken");

// @desc Success Github OAuth Login Feedback
// @route GET /auth/login/success
// @access Public
const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    generateToken(res, req.user.username);
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});

// @desc Failed Github OAuth Login Feedback
// @route GET /auth/login/failed
// @access Public
const failedLoginHandler = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

// @desc Github OAuth Logout
// @route GET /auth/login/success
// @access Public
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
