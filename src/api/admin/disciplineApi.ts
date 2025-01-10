import axiosInstance from "./axiosInstanceAdmin";

export interface TDiscipline {
  id?: number;
  lecture_teachers: number[];
  practice_teachers: number[];
  university: number;
  name: string;
}

export interface TDisciplineParams {
  search?: string;
  teacherId?: string;
  universityId?: string;
}

export const getDisciplines = async ({
  search,
  teacherId,
  universityId,
}: TDisciplineParams): Promise<TDiscipline[]> => {
  const response = await axiosInstance.get<TDiscipline[]>("/subject/", {
    params: {
      search: search,
      teacher: teacherId,
      university: universityId,
    },
  });
  return response.data;
};

export const getDiscipline = async (id: string): Promise<TDiscipline> => {
  const response = await axiosInstance.get<TDiscipline>(`/subject/${id}/`);
  return response.data;
};

export const deleteDiscipline = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/subject/${id}/`);
};

export const postDiscipline = async (
  data: TDiscipline
): Promise<TDiscipline> => {
  const response = await axiosInstance.post<TDiscipline>("/subject/", data);
  return response.data;
};

export const putDiscipline = async (
  id: string,
  data: TDiscipline
): Promise<TDiscipline> => {
  const response = await axiosInstance.put<TDiscipline>(
    `/subject/${id}/`,
    data
  );
  return response.data;
};
