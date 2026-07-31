const Category = require("../models/Category");

// Add Category
const addCategory = async (req, res) => {
  try {

    const { categoryName } = req.body;

    // Check category already exists
    const existingCategory = await Category.findOne({ categoryName });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Create category
    const category = await Category.create({
      categoryName,
    });

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {

    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {

    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Delete Category
const deleteCategory = async (req, res) => {
  try {

    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};