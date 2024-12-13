import axios from "axios";

const axiosInstancePolls = axios.create({
  baseURL: "http://localhost:8000/api/polls/",
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
