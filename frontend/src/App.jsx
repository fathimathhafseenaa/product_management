import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/whishlist/Wishlist";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddSubCategory from "./pages/AddSubCategory/AddSubCategory";
import AddProduct from "./pages/Addproduct/AddProduct";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function App() {
  return (
  
      <Routes>

        {/* Login */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Signup */}
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Home */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

        {/* Add Category */}
        <Route path="/add-category" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />

        {/* Add Sub Category */}
        <Route path="/add-subcategory" element={<ProtectedRoute><AddSubCategory /></ProtectedRoute>} />

        {/* Add Product */}
        <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />

      </Routes>

  );
}

export default App;