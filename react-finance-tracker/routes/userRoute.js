const router = require("express").Router();
const protect = require("../middleware/authHandler");
const { successLoginHandler, registerUser, authUser, logoutUser, updateUser, deleteUser } = require("../controller/userController");

router.route("/").post(registerUser).put(protect, updateUser).delete(protect, deleteUser);
router.route("/success").get(protect, successLoginHandler);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);

module.exports = router;
