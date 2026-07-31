import api from "./api";

export const getCategories = async () => {
  return await api.get("/category");
};

export const addCategory = async (data) => {
  return await api.post("/category/add", data);
};