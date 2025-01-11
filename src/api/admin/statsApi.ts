import axiosInstance from "./axiosInstanceAdmin";

export interface TStats {
  months: TStatsItem[];
}

export interface TStatsItem {
  name: string;
  year: string;
  rating: number;
}

export interface TStatsWeek {
  weeks: TStatsWeekItem[];
}

export interface TStatsWeekItem {
  week_number: number;
  rating: number;
}

export interface TStatsParams {
  instituteId: string;
  year: string;
  month: string;
}

export const getStatsByMonth = async (instituteId: string) => {
  const response = await axiosInstance.get<TStats>(`university/${instituteId}/statistics/`);
  return response.data.months;
};

export const getStatsByWeek = async ({
  instituteId,
  year,
  month
}: TStatsParams) => {
  const response = await axiosInstance.get<TStatsWeek>(`university/${instituteId}/statistics/weeks/`, {
    params: {
      year: year,
      month: month
    },
  });
  return response.data.weeks;
};
