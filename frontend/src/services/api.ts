import axios from "axios";

const api = axios.create({
    baseURL: `http://${import.meta.env.VITE_BACKEND_URL}/v0/api`
});

export default api;