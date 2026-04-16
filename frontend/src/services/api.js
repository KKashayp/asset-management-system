import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

export const getUsers = () => api.get("/users");
export const addUser = (data) => api.post("/users", data);

export const getAssets = () => api.get("/assets");
export const addAsset = (data) => api.post("/assets", data);
export const updateAsset = (id, data) => api.put(`/assets/${id}`, data);
export const retireAsset = (id) => api.put(`/assets/retire/${id}`);

export const getAllocations = () => api.get("/allocations");
export const getActiveAllocations = () => api.get("/allocations/active");
export const getMyAllocations = () => api.get("/allocations/my");
export const allocateAsset = (data) => api.post("/allocations", data);
export const returnAsset = (id) => api.put(`/allocations/return/${id}`);

export default api;