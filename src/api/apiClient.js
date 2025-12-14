import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Automatically attach access token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("fundfeed_user");

  if (stored) {
    const user = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${user.access}`;
  }

  // Dev-only logging (without sensitive data)
  if (import.meta.env.DEV) {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
});

export default api;
