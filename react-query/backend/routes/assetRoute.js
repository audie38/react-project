const router = require("express").Router();
const uploadImage = require("../controller/assetController");
const protect = require("../middleware/authHandler");

router.route("/").post(protect, uploadImage);

module.exports = router;
