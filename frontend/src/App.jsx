import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/whishlist/Wishlist";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddSubCategory from "./pages/AddSubCategory/AddSubCategory";
import AddProduct from "./pages/AddProduct/AddProduct";


function ProtectedRoute({ children }) {
  const user = localStorage.getItem("userId");

  return user ? children : <Navigate to="/" />;
}


function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Signup */}
      <Route path="/signup" element={<Signup />} />


      {/* Protected Pages */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-category"
        element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-subcategory"
        element={
          <ProtectedRoute>
            <AddSubCategory />
          </ProtectedRoute>
        }
      />

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
