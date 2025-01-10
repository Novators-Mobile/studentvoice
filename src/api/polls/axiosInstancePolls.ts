import axios from "axios";
import { BASE_URL } from "../../utils/const";

const axiosInstancePolls = axios.create({
  baseURL: `${BASE_URL}/polls/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: убрать добавление токена авторизации
axiosInstancePolls.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstancePolls;
