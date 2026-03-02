import { type Internship } from 'src/api/models/Internship';
import publicAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getInternshipsByCompany = async (
  companyId: number
): Promise<Internship[]> => {
  const { data } = await publicAxiosClient.get<Internship[]>(
    ENDPOINTS.internships.byCompany(companyId)
  );
  return data;
};