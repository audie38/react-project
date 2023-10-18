const express = require("express");
const router = express.Router();
const protect = require("../middleware/authHandler");
const { registerUser, updateUser, deleteUser, login, logout } = require("../controllers/userController");

router.route("/").post(registerUser).put(protect, updateUser).delete(protect, deleteUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
