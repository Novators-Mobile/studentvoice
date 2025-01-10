import axiosInstance from "./axiosInstanceExcel";

export const getTeachersFromInstitute = async (instituteId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/institute/${instituteId}/teachers`, { responseType: "blob" });
  return response.data;
};

export const getDisciplinesFromInstitute = async (instituteId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/institute/${instituteId}/subjects`, { responseType: "blob" });
  return response.data;
};

export const getTeachersFromDiscipline = async (disciplineId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/subject/${disciplineId}/teachers`, { responseType: "blob" });
  return response.data;
};

export const getLessonsFromDiscipline = async (disciplineId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/subject/${disciplineId}/meetings`, { responseType: "blob" });
  return response.data;
};

export const getDisciplinesFromTeacher = async (teacherId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/teacher/${teacherId}/subjects`, { responseType: "blob" });
  return response.data;
};

export const getLessonsFromTeacher = async (teacherId: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/teacher/${teacherId}/meetings`, { responseType: "blob" });
  return response.data;
};