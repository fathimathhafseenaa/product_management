const express = require("express");
const cors = require("cors");
const path = require("path");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Uploads Folder (Static)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Routes
app.use("/api/auth", authRoutes);

// Category Routes
app.use("/api/category", categoryRoutes);

// Sub Category Routes
app.use("/api/subcategory", subCategoryRoutes);

// Product Routes
app.use("/api/product", productRoutes);

// Wishlist Routes
app.use("/api/wishlist", wishlistRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Server is Running...");
});

module.exports = app;