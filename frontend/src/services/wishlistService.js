import api from "./api";

export const addToWishlist = async (data) => {
  return await api.post("/wishlist/add", data);
};

export const getWishlist = async (userId) => {
  return await api.get(`/wishlist/${userId}`);
};

export const removeWishlist = async (id) => {
  return await api.delete(`/wishlist/${id}`);
};