import axios from "axios";

const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8000/api/admin_api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuthInstance.interceptors.request.use(
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

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const originalRequest = error.config;

        const { data } = await axios.post("/refresh/", {}, { withCredentials: true });
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;