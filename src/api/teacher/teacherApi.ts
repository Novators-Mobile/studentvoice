import { TDiscipline } from "../admin/disciplineApi";
import { TLesson, TLessonParams } from "../admin/lessonApi";
import { TTeacher } from "../admin/teacherApi";
import axiosInstance from "./axiosInstanceTeacher";

export interface TParticipant {
  student_first_name: string;
  student_second_name: string;
  student_patronymic: string;
}

export const getTeacherInfo = async () => {
  const response = await axiosInstance.get<TTeacher>(`/teacher/`);
  return response.data;
};

export const getTeacherLessons = async ({
  search,
  subjectId,
  teacherId,
  type,
}: TLessonParams) => {
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

export const getTeacherLesson = async (id: string): Promise<TLesson> => {
  const response = await axiosInstance.get<TLesson>(`/meeting/${id}/`);
  return response.data;
};

export const deleteTeacherLesson = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/meeting/${id}/`);
};

export const postTeacherLesson = async (data: TLesson): Promise<TLesson> => {
  const response = await axiosInstance.post<TLesson>("/meeting/", data);
  return response.data;
};

export const putTeacherLesson = async (
  id: string,
  data: TLesson
): Promise<TLesson> => {
  const response = await axiosInstance.put<TLesson>(`/meeting/${id}/`, data);
  return response.data;
};

export const getTeacherDisciplines = async (): Promise<TDiscipline[]> => {
  const response = await axiosInstance.get<TDiscipline[]>(`/subject/`);
  return response.data;
};

export const getLessonParticipants = async (id: string) => {
  const response = await axiosInstance.get<TParticipant[]>(`/meeting/${id}/participants`);
  return response.data;
};