import axiosInstance from "./axiosInstanceAdmin";

export interface TLesson {
  id?: number;
  subject: number;
  date: string;
  poll?: number;
  teacher: number;
  type: "lecture" | "practice";
  time?: string;
  name: string;
  rating?: number | null;
  subject_name?: string;
}

export interface TLessonParams {
  search?: string; // TODO: проверить, когда будет реализовано
  subjectId?: string;
  teacherId?: string;
  type?: "lecture" | "practice";
}

export const getLessons = async ({
  search,
  subjectId,
  teacherId,
  type,
}: TLessonParams): Promise<TLesson[]> => {
  const response = await axiosInstance.get<TLesson[]>("/meeting/", {
    params: {
      search: search,
      subject: subjectId,
      teacher: teacherId,
      type: type,
    },
  });
  return response.data;
};

export const getLesson = async (id: string): Promise<TLesson> => {
  const response = await axiosInstance.get<TLesson>(`/meeting/${id}/`);
  return response.data;
};

export const postLesson = async (data: TLesson): Promise<TLesson> => {
  const response = await axiosInstance.post<TLesson>("/meeting/", data);
  return response.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/meeting/${id}/`);
};

export const putLesson = async (
  id: string,
  data: TLesson
): Promise<TLesson> => {
  const response = await axiosInstance.put<TLesson>(`/meeting/${id}/`, data);
  return response.data;
};
