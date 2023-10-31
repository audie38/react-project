const router = require("express").Router();
const protect = require("../middleware/authHandler");

const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require("../controller/categoryController");

router.route("/").get(protect, getCategories).post(protect, addCategory);
router.route("/:id").get(protect, getCategoryById).put(protect, updateCategory).delete(protect, deleteCategory);

module.exports = router;
