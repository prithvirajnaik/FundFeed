import axios from "axios";
console.log("🔥 apiClient loaded");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL|| "http://localhost:8000",   // Django backend
});

// Automatically attach access token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("fundfeed_user");
  console.log("🔥 INTERCEPTOR RUNNING for:", config.url);

  if (stored) {
    const user = JSON.parse(stored);
    console.log("🔥 TOKEN FOUND in localStorage:", user.access);

    config.headers.Authorization = `Bearer ${user.access}`;
    console.log("🔥 ATTACHED HEADER:", config.headers.Authorization);
  } else {
    console.log("⚠️ No stored user");
  }

  return config;
});


export default api;
