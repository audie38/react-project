const asyncHandler = require("express-async-handler");
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_BASE_URL;

// @desc Success Github OAuth Login Feedback
// @route GET /auth/login/success
// @access Public
const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});

// @desc Failed Github OAuth Login
// @route GET /auth/login/failed
// @access Public
const failedLoginHandler = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

// @desc Github OAuth Logout
// @route GET /auth/logout
// @access Public
const logoutHandler = asyncHandler(async (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

// @desc Github OAuth Login
// @route GET /auth/github
// @access Public
const githubLoginHandler = passport.authenticate("github", { scope: ["profile"] });

// @desc Github OAuth Login Redirect
// @route GET /auth/github/callback
// @access Public
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
