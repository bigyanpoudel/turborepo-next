import axios from "axios";
import { firebase } from "./firebase";
axios.defaults.responseType = "json";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  async (config: any) => {
    const token = await firebase.auth().currentUser?.getIdToken(true);
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export { API };
