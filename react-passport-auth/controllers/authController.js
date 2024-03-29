const asyncHandler = require("express-async-handler");
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_BASE_URL;

const successLoginHandler = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});

const failedLoginHandler = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

const logoutHandler = asyncHandler(async (req, res) => {
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
