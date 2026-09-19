import axios from "axios";

const api = axios.create({
  baseURL: "https://student-erp-production-770d.up.railway.app/api",
});

export default api;