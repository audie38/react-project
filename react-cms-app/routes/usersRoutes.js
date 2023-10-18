const express = require("express");
const router = express.Router();
const { registerUser, getUserData, getProfileData, updateUser, deleteUser, login, logout, uploadEventImage } = require("../controllers/userController");

const protect = require("../middleware/authHandler");

router.route("/").get(protect, getUserData).post(registerUser).put(protect, updateUser).delete(protect, deleteUser);
router.route("/profile/:uid").get(getProfileData);
router.route("/auth").post(login);
router.route("/logout").post(logout);
router.route("/upload").post(protect, uploadEventImage);

module.exports = router;
