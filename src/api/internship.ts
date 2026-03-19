import { type Internship } from './models/Internship';
import { userAxiosClient } from './axios.clients';

export const getInternshipById = async (id: number): Promise<Internship> => {
  const { data } = await userAxiosClient.get<Internship>(`/internship/${id}/`);
  return data;
};
