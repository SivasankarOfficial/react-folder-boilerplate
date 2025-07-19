import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "https://api.example.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add your token-based request interceptor here
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // You can handle request errors here (optional)
    return Promise.reject(error);
  }
);

export default axiosInstance;
