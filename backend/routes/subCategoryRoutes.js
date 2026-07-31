const express = require("express");
const router = express.Router();

const {
  addSubCategory,
  getSubCategories,
} = require("../controllers/subCategoryController");

// Add Sub Category
router.post("/add", addSubCategory);

// Get All Sub Categories
router.get("/", getSubCategories);

module.exports = router;