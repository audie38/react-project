const router = require("express").Router();
const protect = require("../middleware/authHandler");

router.route("/").get(protect).post(protect).put(protect).delete(protect);
router.route("/login").post();
router.route("/logout").post();

module.exports = router;
