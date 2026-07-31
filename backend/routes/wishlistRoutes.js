const express = require("express");

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// Add Wishlist
router.post("/add", addToWishlist);

// Get Wishlist by User
router.get("/:userId", getWishlist);

// Remove Wishlist
router.delete("/:id", removeWishlist);

module.exports = router;