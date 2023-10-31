const router = require("express").Router();
const { successLoginHandler, failedLoginHandler, logoutHandler, githubLoginHandler, githubLoginCallbackHandler } = require("../controller/authController");

router.route("/login/success").get(successLoginHandler);
router.route("/login/failed").get(failedLoginHandler);
router.route("/logout").get(logoutHandler);
router.route("/github").get(githubLoginHandler);
router.route("/github/callback").get(githubLoginCallbackHandler);

module.exports = router;
