const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

// Add Sub Category
const addSubCategory = async (req, res) => {
  try {

    const { subCategoryName, category } = req.body;

    // Check Category Exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check Sub Category Exists
    const existingSubCategory = await SubCategory.findOne({
      subCategoryName,
      category,
    });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Sub Category already exists",
      });
    }

    // Create Sub Category
    const subCategory = await SubCategory.create({
      subCategoryName,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Sub Category added successfully",
      subCategory,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Sub Categories
const getSubCategories = async (req, res) => {
  try {

    const subCategories = await SubCategory.find()
      .populate("category");

    res.status(200).json({
      success: true,
      subCategories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addSubCategory,
  getSubCategories,
};