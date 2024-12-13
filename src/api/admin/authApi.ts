import axiosInstance from "./axiosInstanceAdmin";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    first_name: string;
    second_name: string;
    patronymic: string;
    user_type: string;
  };
}

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await axiosInstance.post<LoginResponse>("/login/", data);

  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("role", response.data.user.user_type);
  localStorage.setItem("userId", String(response.data.user.id));
  localStorage.setItem(
    "fio",
    `${response.data.user.second_name} ${response.data.user.first_name} ${response.data.user.patronymic}`
  );
};

export const logout = async (): Promise<void> => {
  // await axiosInstance.post("/auth/logout/", {});

  localStorage.clear();
};
