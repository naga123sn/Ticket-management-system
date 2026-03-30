import API from "./api";

// Users
export const getAllUsers = () => API.get("/users");
export const updateUserStatus = (id, is_active) =>
  API.patch(`/users/${id}/status`, { is_active });
export const updateProfile = (id, data) => API.put(`/users/${id}`, data);

// Helpers
export const getAllHelpers = () => API.get("/helpers");
export const addHelper = (data) => API.post("/helpers", data);
