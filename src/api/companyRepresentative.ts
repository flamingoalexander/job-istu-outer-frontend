import { type CompanyRepresentative } from 'src/api/models/CompanyRepresentative';
import userAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getMyCompanyRepresentative = async (): Promise<CompanyRepresentative> => {
  const { data } = await userAxiosClient.get<CompanyRepresentative>(
    ENDPOINTS.users.profileRepresentative(),
  );
  return data;
};
