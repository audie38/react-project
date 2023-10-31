const asyncHandler = require("express-async-handler");
const Categories = require("../model/Category");
const { Op } = require("sequelize");

// @desc    Add New Category
// @route   POST /api/v1/category
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryType } = req.body;
  if (!categoryName || !categoryType) {
    return res.status(400).json({ message: "Category Name/Type cannot be empty" });
  }
  const existingCategory = await Categories.findOne({
    where: {
      categoryName: categoryName,
    },
  });
  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }
  const newCategory = await Categories.create({
    categoryName: categoryName,
    categoryType: categoryType,
    userId: req?.user?.userId,
  });
  if (newCategory) {
    return res.status(201).json({
      success: true,
      message: "Add Category Success",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Add Category Failed",
  });
});

// @desc    Get List of Categories
// @route   GET /api/v1/category
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const categories = await Categories.findAll({
    where: {
      [Op.or]: [
        {
          userId: userId,
        },
        {
          userId: null,
        },
      ],
    },
  });
  return res.status(200).json({
    success: true,
    message: "Success",
    data: categories,
  });
});

// @desc    Get Category By Id
// @route   GET /api/v1/category/:id
// @access  Private
const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ message: "CategoryId cannot be empty" });
  }
  const category = await Categories.findByPk(categoryId);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Success",
    data: category,
  });
});

// @desc    Update Category
// @route   PUT /api/v1/category/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ message: "CategoryId cannot be empty" });
  }
  const existingCategory = await Categories.findByPk(categoryId);
  if (!existingCategory) {
    return res.status(404).json({
      success: false,
      message: "Category Not Found",
    });
  }
  const { categoryName, categoryType } = req.body;
  if (categoryName) {
    existingCategory.categoryName = categoryName;
  }
  if (categoryType) {
    existingCategory.categoryType = categoryType;
  }
  const updatedCategory = await existingCategory.save();
  if (updatedCategory) {
    return res.status(200).json({
      success: true,
      message: "Category Update Success",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Category Update Failed",
  });
});

// @desc    Delete Category
// @route   DELETE /api/v1/category/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ message: "CategoryId cannot be empty" });
  }
  const existingCategory = await Categories.findByPk(categoryId);
  if (!existingCategory) {
    return res.status(404).json({
      success: false,
      message: "Category Not Found",
    });
  }
  const deletedCategory = await existingCategory.destroy();
  if (deletedCategory) {
    return res.status(200).json({
      success: true,
      message: "Delete Category Success",
    });
  }
  return res.status(500).json({
    success: false,
    messsage: "Delete Category Failed",
  });
});

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
