import api from "./api";

export const getSubCategories = async () => {
  return await api.get("/subcategory");
};

export const addSubCategory = async (data) => {
  return await api.post("/subcategory/add", data);
};