import axios from "axios";
const baseURL =
  (process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:5000/") +
  "api";
export const API = axios.create({ baseURL });
