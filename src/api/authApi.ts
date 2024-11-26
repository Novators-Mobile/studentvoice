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
    password: string;
  };
}

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await axiosInstance.post<LoginResponse>("/login/", data);

  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("role", response.data.user.username);
};

export const logout = async (): Promise<void> => {
  // await axiosInstance.post("/auth/logout/", {});

  localStorage.clear();
};
