import { type Company } from 'src/api/models/Company';
import publicAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await publicAxiosClient.get<Company[]>(ENDPOINTS.companies.companies());
  return data;
};
