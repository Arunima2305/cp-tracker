// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "https://localhost:5000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
