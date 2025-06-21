import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://testestes.loca.lt/api',
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  },
});
