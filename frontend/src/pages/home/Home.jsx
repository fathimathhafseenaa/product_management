import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getSubCategories } from "../../services/subCategoryService";
import { addToWishlist, getWishlist } from "../../services/wishlistService";

import AddProductModal from "../AddProduct/AddProduct";
import AddCategoryModal from "../AddCategory/AddCategory";
import AddSubCategoryModal from "../AddSubCategory/AddSubCategory";

import EditProductModal from "../ProductEdit/ProductEdit";

import ItemsPanel from "../whishlist/Wishlist";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar"; 

const PRODUCTS_PER_PAGE = 6;

export default function ProductListing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // which category row is expanded in the sidebar (shows its subcategories)
  const [openCategory, setOpenCategory] = useState(null);

  // subcategory checkbox selections (multi-select), used to filter products
  const [checkedSubCategories, setCheckedSubCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Add Modals
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);

  // Wishlist
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Edit Modal
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
    fetchWishlistCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await getSubCategories();
      setSubCategories(res.data.subCategories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await getWishlist(userId);
      setWishlistCount((res.data.wishlist || []).length);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle a category row open/closed in the sidebar
  const toggleCategory = (catId) => {
    setOpenCategory((prev) => (prev === catId ? null : catId));
  };

  // Toggle a subcategory checkbox
  const toggleSubCategoryCheck = (subId) => {
    setCheckedSubCategories((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
    setCurrentPage(1); // reset to page 1 whenever the filter changes
  };

  const clearCategoryFilter = () => {
    setOpenCategory(null);
    setCheckedSubCategories([]);
    setCurrentPage(1);
  };

  // Reset to page 1 whenever the search text changes
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Filter products by search text and checked subcategories
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const subRef = item.subCategory ?? item.subCategoryId;
    const itemSubCatId =
      typeof subRef === "object" && subRef !== null ? subRef._id : subRef;

    const matchSubCategory =
      checkedSubCategories.length === 0 ||
      checkedSubCategories.includes(itemSubCatId);

    return matchSearch && matchSubCategory;
  });

  // ---- Pagination math ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Build a compact page number list
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 1) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };
  // ---- end pagination math ----

  const handleProductAdded = () => {
    setShowAddProduct(false);
    fetchProducts();
  };

  const handleCategoryAdded = () => {
    setShowAddCategory(false);
    fetchCategories();
  };

  const handleSubCategoryAdded = () => {
    setShowAddSubCategory(false);
    fetchSubCategories();
  };

  // after update product
  const handleProductUpdated = () => {
    setShowEditProduct(false);
    setSelectedProductId(null);
    fetchProducts();
  };

  // Wishlist Add
  const handleWishlist = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await addToWishlist({ userId, productId });

      console.log("Wishlist response:", res.data);

      fetchWishlistCount();

      alert("Product added to Wishlist");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pl-page">
      {/* Navbar */}

      <Navbar
        search={search}
        onSearchChange={handleSearchChange}
        onWishlistClick={() => setShowWishlist(true)}
        wishlistCount={wishlistCount}
      />

      <div className="pl-body">
        {/* Sidebar (now a separate component) */}

        <Sidebar
          categories={categories}
          subCategories={subCategories}
          openCategory={openCategory}
          checkedSubCategories={checkedSubCategories}
          onToggleCategory={toggleCategory}
          onToggleSubCategory={toggleSubCategoryCheck}
          onClearFilter={clearCategoryFilter}
        />

        {/* Main Content */}

        <main className="pl-main">
          <div className="pl-toolbar">
            <div className="pl-toolbar-actions">
              <button
                className="pl-action-btn"
                onClick={() => setShowAddCategory(true)}
              >
                Add Category
              </button>

              <button
                className="pl-action-btn"
                onClick={() => setShowAddSubCategory(true)}
              >
                Add Sub Category
              </button>

              <button
                className="pl-action-btn"
                onClick={() => setShowAddProduct(true)}
              >
                Add Product
              </button>
            </div>
          </div>

          {loading ? (
            <h3>Loading Products...</h3>
          ) : filteredProducts.length === 0 ? (
            <h3>No Products Found</h3>
          ) : (
            <div className="pl-grid">
              {paginatedProducts.map((product) => (
                <div className="pl-card" key={product._id}>
                  <div className="pl-card-top">
                   <img
  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.image}`}
  alt={product.productName}
  className="pl-product-image"
/>

                    <button
                      className="pl-heart"
                      onClick={() => handleWishlist(product._id)}
                    >
                      ♡
                    </button>
                  </div>

                  <h5 className="pl-product-name">{product.productName}</h5>

                  <div className="pl-price">
                    ₹ {product.variants?.[0]?.price}
                  </div>

                  <div className="pl-stars">★★★★★</div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      className="pl-action-btn"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      View
                    </button>

                    {/* EDIT MODAL OPEN */}
                    <button
                      className="pl-action-btn"
                      onClick={() => {
                        setSelectedProductId(product._id);
                        setShowEditProduct(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}

          {!loading && filteredProducts.length > 0 && (
            <div className="pl-pagination">
              <span>Total Products : {filteredProducts.length}</span>

              <div className="pl-page-nums">
                <button
                  className="pl-page-arrow"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                >
                  ‹
                </button>

                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span key={`dots-${idx}`} className="pl-page-dots">
                      ...
                    </span>
                  ) : (
                    <span
                      key={page}
                      className={
                        page === safePage ? "pl-page-active" : "pl-page-num"
                      }
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </span>
                  )
                )}

                <button
                  className="pl-page-arrow"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                >
                  ›
                </button>
              </div>

              <div>
                Showing {paginatedProducts.length} of{" "}
                {filteredProducts.length} Products
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}

      <AddProductModal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdded={handleProductAdded}
      />

      {/* Add Category Modal */}

      <AddCategoryModal
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onAdded={handleCategoryAdded}
      />

      {/* Add Sub Category Modal */}

      <AddSubCategoryModal
        open={showAddSubCategory}
        onClose={() => setShowAddSubCategory(false)}
        categories={categories}
        onAdded={handleSubCategoryAdded}
      />

      {/* Edit Product Modal */}

      <EditProductModal
        open={showEditProduct}
        productId={selectedProductId}
        onClose={() => {
          setShowEditProduct(false);
          setSelectedProductId(null);
        }}
        onUpdated={handleProductUpdated}
      />

      {/* Wishlist Side Panel */}

      <ItemsPanel
        open={showWishlist}
        onClose={() => {
          setShowWishlist(false);
          fetchWishlistCount();
        }}
      />
    </div>
  );
}
