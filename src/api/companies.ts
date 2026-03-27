import { type Company } from 'src/api/models/Company';
import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await userAxiosClient.get<Company[]>(ENDPOINTS.companies.companies());
  return data;
};

export const getCompanyById = async (id: number): Promise<Company> => {
  const { data } = await userAxiosClient.get<Company>(ENDPOINTS.companies.byId(id));
  return data;
};

export const updateCompany = async (id: number, payload: Partial<Company>): Promise<Company> => {
  const { data } = await userAxiosClient.put<Company>(ENDPOINTS.companies.byId(id), payload);
  return data;
};
