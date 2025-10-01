// src/services/api.ts
import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL as string) ?? "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;
