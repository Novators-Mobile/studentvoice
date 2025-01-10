import axiosInstance from "./axiosInstanceAdmin";

export interface TStats {
  months: TStatsItem[];
}

export interface TStatsItem {
  name: string;
  year: string;
  rating: number;
}


export const getStatsByMonth = async (instituteId: string): Promise<TStats> => {
  const response = await axiosInstance.get<TStats>(`university/${instituteId}/statistics/`);
  return response.data;
};
