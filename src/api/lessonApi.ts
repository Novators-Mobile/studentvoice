import axiosInstance from "./axiosAuthInstance";

export interface TLesson {
  id?: number;
  subject: number;
  date: string;
  poll?: number;
  teacher: number;
  type: "lecture" | "practice";
}

export interface TLessonParams {
  search?: string; // TODO: проверить, когда будет реализовано
  subjectId?: string;
  teacherId?: string;
  type?: "lecture" | "practice"
}

export const getLessons = async ({ search, subjectId, teacherId, type }: TLessonParams): Promise<TLesson[]> => {
  const response = await axiosInstance.get<TLesson[]>("/meeting/", { params: {
    search: search,
    subject: subjectId,
    teacher: teacherId,
    type: type
  }});
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