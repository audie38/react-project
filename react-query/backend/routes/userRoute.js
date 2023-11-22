const router = require("express").Router();
const protect = require("../middleware/authHandler");
const { registerUser, updateUser, deleteUser, authUser, logoutUser, successLoginHandler } = require("../controller/userController");

router.route("/").get(protect, successLoginHandler).post(registerUser).put(protect, updateUser).delete(protect, deleteUser);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);

module.exports = router;
