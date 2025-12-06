import type { Company } from 'src/api';
import publicAxiosClient, { userAxiosClient } from 'src/api/axios.clients';
import ENDPOINTS from 'src/api/endpoints';
import { Credentials } from 'src/api/models/Credentials';
export const login = async (payload: Credentials): Promise<void> => {
  const { data } = await userAxiosClient.post(ENDPOINTS.auth.login(), payload);
  console.log('login', data);
};

export const logout = async (): Promise<Company[]> => {
  const { data } = await publicAxiosClient.get<Company[]>(ENDPOINTS.companies.companies());
  return data;
};
