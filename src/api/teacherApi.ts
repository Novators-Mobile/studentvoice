import axiosInstance from "./axiosAuthInstance";

export interface TTeacher {
  id?: number;
  first_name: string,
  second_name: string,
  patronymic: string,
  university: number,
  email: string,
  username: string
}

export interface TTeacherParams {
  search?: string;
  subjectId?: string;
  universityId?: string;
}

// TODO: проверить, работает ли поиск по предмету (сейчас его нет)
export const getTeachers = async ({ search, subjectId, universityId }: TTeacherParams): Promise<TTeacher[]> => {
  const response = await axiosInstance.get<TTeacher[]>("/teacher/", { params: {
    search: search,
    subject: subjectId,
    university: universityId
  }});
  return response.data;
};

export const getTeacher = async (id: string): Promise<TTeacher> => {
  const response = await axiosInstance.get<TTeacher>(`/teacher/${id}/`);
  return response.data;
};

export const deleteTeacher = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/teacher/${id}/`);
};

export const postTeacher = async (data: TTeacher): Promise<TTeacher> => {
  const response = await axiosInstance.post<TTeacher>("/teacher/", data);
  return response.data;
};