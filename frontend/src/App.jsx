import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/whishlist/Wishlist";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddSubCategory from "./pages/AddSubCategory/AddSubCategory";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
  return (
  
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Add Category */}
        <Route path="/add-category" element={<AddCategory />} />

        {/* Add Sub Category */}
        <Route path="/add-subcategory" element={<AddSubCategory />} />

        {/* Add Product */}
        <Route path="/add-product" element={<AddProduct />} />

      </Routes>

  );
}

export default App;
