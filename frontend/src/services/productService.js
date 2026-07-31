import api from "./api";


// Get All Products
export const getProducts = async () => {
  return await api.get("/product");
};


// Add Product
export const addProduct = async (data) => {
  return await api.post("/product/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


// Update Product
export const updateProduct = async (id, data) => {
  return await api.put(`/product/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


// Delete Product
export const deleteProduct = async (id) => {
  return await api.delete(`/product/delete/${id}`);
};


// Get Single Product
export const getSingleProduct = async (id) => {
  return await api.get(`/product/${id}`);
};