import axios from "axios";
import { BASE_URL } from "../../utils/const";

const axiosInstanceAdmin = axios.create({
  baseURL: `${BASE_URL}/teacher_api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceAdmin.interceptors.request.use(
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

axiosInstanceAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const originalRequest = error.config;

        const { data } = await axios.post("/refresh/", {}, { withCredentials: true });
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstanceAdmin(originalRequest);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceAdmin;
