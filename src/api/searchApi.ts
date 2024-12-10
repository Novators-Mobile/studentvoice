import axiosInstance from "./axiosAuthInstance";

type TSubject = {
  id: number;
  university_id: number;
  name: string;
}

type TTeacher = {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  user_type: "teacher" | "admin";
  second_name: string;
  patronymic: string;
  customuser_ptr_id: number;
  university_id: number;
}

type TUniversity = {
  id: number;
  name: string;
}

export interface TSearch {
  subjects: TSubject[];
  teachers: TTeacher[];
  universities: TUniversity[];
}

export const search = async ( search?: string ): Promise<TSearch> => {
  const response = await axiosInstance.get<TSearch>("/search/", { params: {
    search: search
  }});
  return response.data;
};