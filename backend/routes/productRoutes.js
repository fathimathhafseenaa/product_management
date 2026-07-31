const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");


// Add Product
router.post("/add", upload.array("images",5), addProduct);


// Get Products
router.get("/", getProducts);


// Get Single Product
router.get("/:id", getSingleProduct);


// Update Product
router.put("/update/:id", upload.array("images",5), updateProduct);


// Delete Product
router.delete("/delete/:id", deleteProduct);


module.exports = router;
