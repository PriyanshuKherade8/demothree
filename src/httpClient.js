// httpClient.js
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://143.110.186.134/api/collection",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;

export const backendClient = axios.create({
  baseURL: "http://143.110.186.134/api",
  headers: {
    "Content-Type": "application/json",
  },
});
