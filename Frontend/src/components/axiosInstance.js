import axios from "axios";

// setting base url
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//  Automatically attach token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// to use axios without sending token to use for cloudinary
export const plainAxios = axios.create();

export default axiosInstance;
