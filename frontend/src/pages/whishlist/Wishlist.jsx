import React, { useEffect, useState } from "react";
import "./whishlist.css";
import { getWishlist, removeWishlist } from "../../services/wishlistService";

const Stars = () => (
  <div className="ip-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="ip-star">
        ★
      </span>
    ))}
  </div>
);

export default function ItemsPanel({ open = true, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchWishlist();
    }
  }, [open]);

  // Get Wishlist Items
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      const res = await getWishlist(userId);

      setItems(res.data.wishlist || []);
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove Wishlist Item
  const removeItem = async (id) => {
    try {
      await removeWishlist(id);

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"ip-overlay" + (open ? " ip-overlay-open" : "")}>
      <div className="ip-backdrop" onClick={onClose} />

      <aside className="ip-panel">
        <div className="ip-panel-header">
          <span className="ip-heart">♡</span>
          <h3 className="ip-title">Items</h3>
          <button className="ip-close-arrow" onClick={onClose}>
            ›
          </button>
        </div>

        <div className="ip-list">
          {loading ? (
            <div className="ip-empty-state">
              <p className="ip-empty-title">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="ip-empty-state">
              <div className="ip-empty-icon">♡</div>
              <p className="ip-empty-title">No wishlist items</p>
              <p className="ip-empty-sub">
                Items you save will show up here
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div className="ip-item" key={item._id}>
                <div className="ip-thumb">
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.productName}
                    className="ip-thumb-img"
                  />
                </div>

                <div className="ip-item-info">
                  <div className="ip-item-name">
                    {item.product.productName}
                  </div>
                  <div className="ip-item-price">
                    ₹ {item.product.variants?.[0]?.price}
                  </div>
                  <Stars />
                </div>

                <button
                  className="ip-remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  ⊗
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}