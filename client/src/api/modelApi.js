import axios from "axios";

const API_BASE = import.meta.env.VITE_SERVER_API_BASE;

export const fetchModels = () =>
  axios.get(`${API_BASE}/api/models`);
