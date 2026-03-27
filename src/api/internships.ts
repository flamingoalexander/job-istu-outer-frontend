import { type Internship } from 'src/api/models/Internship';
import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export const getInternshipsByCompany = async (companyId: number): Promise<Internship[]> => {
  const { data } = await userAxiosClient.get<Internship[]>(ENDPOINTS.internships.base(), {
    params: { company: companyId },
  });
  return data;
};
