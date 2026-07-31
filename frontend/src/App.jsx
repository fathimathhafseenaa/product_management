import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/whishlist/Wishlist";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddSubCategory from "./pages/AddSubCategory/AddSubCategory";
import AddProduct from "./pages/Addproduct/AddProduct";


// Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}


function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Signup */}
      <Route path="/signup" element={<Signup />} />


      {/* Protected Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />


      {/* Protected Product Details */}
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />


      {/* Protected Wishlist */}
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />


      {/* Protected Add Category */}
      <Route
        path="/add-category"
        element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
        }
      />


      {/* Protected Add Sub Category */}
      <Route
        path="/add-subcategory"
        element={
          <ProtectedRoute>
            <AddSubCategory />
          </ProtectedRoute>
        }
      />


      {/* Protected Add Product */}
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}

export default App;
