import axios from "axios";

const instance = axios.create({
  baseURL: "https://copperjems.onrender.com/api",
});

/* ✅ AUTO ATTACH TOKEN */
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
