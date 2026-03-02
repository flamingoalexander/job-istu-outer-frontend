import { type Credentials } from 'src/api/models/Credentials';
import ENDPOINTS from 'src/api/endpoints';
import { userAxiosClient } from 'src/api/axios.clients';
import type { UserRoles } from 'src/constants';

export const login = async (payload: Credentials): Promise<void> => {
  await userAxiosClient.post(ENDPOINTS.auth.login(), payload);
};

export const loginEsia = async (): Promise<void> => {
  await userAxiosClient.get(ENDPOINTS.auth.esia());
};

export const logout = async (): Promise<void> => {
  await userAxiosClient.post(ENDPOINTS.auth.logout());
};

export type MeResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  patronymic: string | null;
  roles: { name: UserRoles }[];
};
type MeApiResponse = {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  patronymic: string | null;
  roles: { name: UserRoles }[];
};
const mapMeToCamel = (api: MeApiResponse): MeResponse => ({
  id: api.id,
  username: api.username,
  email: api.email,
  firstName: api.first_name,
  lastName: api.last_name,
  patronymic: api.patronymic,
  roles: api.roles,
});

export const getMe = async (): Promise<MeResponse> => {
  const { data } = await userAxiosClient.get<MeApiResponse>(ENDPOINTS.auth.me());
  return mapMeToCamel(data);
};
