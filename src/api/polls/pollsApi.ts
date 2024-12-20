import axiosInstance from "./axiosInstancePolls";

export interface TPoll {
  id: number;
  question1_avg_mark: number | null;
  question2_avg_mark: number | null;
  question3_avg_mark: number | null;
  question4_avg_mark: number | null;
  question5_avg_mark: number | null;
}

export interface TPollResults {
  id?: number;
  student_first_name: string;
  student_second_name: string;
  student_patronymic: string;
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  comment1: string;
  comment2: string;
  poll: number;
}

export const getPoll = async (id: string): Promise<TPoll> => {
  const response = await axiosInstance.get<TPoll>(`/${id}/`);
  return response.data;
};

export const getPollResults = async (id: string): Promise<TPollResults[]> => {
  const response = await axiosInstance.get<TPollResults[]>(`/${id}/pollresults`);
  return response.data;
};

export const postPollResults = async (id: string): Promise<TPollResults> => {
  const response = await axiosInstance.post<TPollResults>(`/${id}/pollresults/`);
  return response.data;
};