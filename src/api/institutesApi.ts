import axiosInstance from "./axiosAuthInstance";

export interface TInstitute {
  id?: number;
  name: string;
}

export const getInstitutes = async (): Promise<TInstitute[]> => {
  const response = await axiosInstance.get<TInstitute[]>("/university/");
  return response.data;
};

export const getInstitute = async (id: string): Promise<TInstitute> => {
  const response = await axiosInstance.get<TInstitute>(`/university/${id}/`);
  return response.data;
};