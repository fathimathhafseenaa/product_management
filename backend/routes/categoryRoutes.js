const express = require("express");
const router = express.Router();

const { addCategory,getCategories,updateCategory,deleteCategory } = require("../controllers/categoryController");

// Add Category
router.post("/add", addCategory);
// get Category
router.get("/", getCategories);
// update Category
router.put("/update/:id", updateCategory);
// delete Category
router.delete("/delete/:id", deleteCategory);

module.exports = router;