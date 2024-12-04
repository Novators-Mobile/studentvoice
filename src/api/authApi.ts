import axiosInstance from "./axiosAuthInstance";

export interface LoginRequest {
  username: string;
  password: string;
}

// TODO: исправить тип возвращаемых данных
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    user_type: string;
  };
}

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await axiosInstance.post<LoginResponse>("/login/", data);

  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("role", response.data.user.user_type);
  localStorage.setItem("username", response.data.user.username);
};

export const logout = async (): Promise<void> => {
  // await axiosInstance.post("/auth/logout/", {});

  localStorage.clear();
};
