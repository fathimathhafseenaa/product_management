import api from "./api";

// Signup
export const signup = (data) => {
  return api.post("/auth/signup", data);
};

// Login
export const login = (data) => {
  return api.post("/auth/login", data);
};