import axios from "axios";

const api = axios.create({
baseURL: "https://student-placement-backend-bkqq.onrender.com",
});

export default api;
