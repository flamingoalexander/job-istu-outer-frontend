import { type CompanyRepresentative } from 'src/api/models/CompanyRepresentative';
import privateAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getMyCompanyRepresentative = async (): Promise<CompanyRepresentative> => {
  const { data } = await privateAxiosClient.get<CompanyRepresentative>(
    ENDPOINTS.users.profileRepresentative()
  );
  return data;
};