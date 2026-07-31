
import React from "react";

import "./Navbar.css";

import { useNavigate } from "react-router-dom";


export default function Navbar({
  search,
  onSearchChange,
  onWishlistClick,
  wishlistCount = 0,
}) {
  
  const navigate = useNavigate();

  // This function runs when the user clicks "Logout"
  const handleLogout = () => {
    
    localStorage.removeItem("token");

  
    navigate("/");
  };

  // This is what gets displayed on the screen
  return (
    // Outer navbar container (dark blue bar)
    <header className="pl-navbar">
      {/* Search box section */}
      <div className="pl-search-wrap">
        {/* Text input where the user types a product name to search */}
        <input
          type="text"
          placeholder="Search Products..."
          className="pl-search-input"
          value={search} // shows the current search text
          onChange={(e) => onSearchChange(e.target.value)}
          // ^ every time the user types, send the new text back up to Home.jsx
        />

        {/* Search button (currently just visual, search happens live while typing) */}
        <button className="pl-search-btn">Search</button>
      </div>

      {/* Right side links: Wishlist, Profile, Logout */}
      <div className="pl-nav-actions">
        {/* Clicking this calls onWishlistClick, which opens the wishlist panel */}
        <span
          className="pl-nav-link pl-wishlist-link"
          onClick={onWishlistClick}
        >
          Wishlist
          {/* Only show the number badge if there is at least 1 item in the wishlist */}
          {wishlistCount > 0 && (
            <span className="pl-wishlist-badge">{wishlistCount}</span>
          )}
        </span>

        {/* Clicking this takes the user to the /profile page */}
        <span className="pl-nav-link" onClick={() => navigate("/profile")}>
          Profile
        </span>

        {/* Clicking this logs the user out */}
        <span className="pl-nav-link" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </header>
  );
}