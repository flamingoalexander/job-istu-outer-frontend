import { type Internship } from './models/Internship';
import publicAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getInternships = async (): Promise<Internship[]> => {
  const { data } = await publicAxiosClient.get<Internship[]>(ENDPOINTS.internships.list());
  return data;
};
