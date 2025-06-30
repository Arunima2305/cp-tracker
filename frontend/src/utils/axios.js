// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL || "https://cp-tracker-zto7.onrender.com",
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
