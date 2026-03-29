import { type Internship } from 'src/api/models/Internship';
import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export const getInternshipsByCompany = async (companyId: number): Promise<Internship[]> => {
  const { data } = await userAxiosClient.get<Internship[]>(ENDPOINTS.internships.list(), {
    params: { company: companyId },
  });
  return data;
};
export const getInternships = async (): Promise<Internship[]> => {
  const { data } = await userAxiosClient.get<Internship[]>(ENDPOINTS.internships.list());
  return data;
};
