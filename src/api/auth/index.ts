import { type Credentials } from 'src/api/models/Credentials';
import type { UserRoles } from 'src/constants';
import ENDPOINTS from 'src/api/endpoints';
import { userAxiosClient } from 'src/api/axios.clients';

type LoginResponse = {
  user: {
    role: UserRoles;
  };
};

export const login = async (payload: Credentials): Promise<{ role: UserRoles }> => {
  //response imitation

  const res = await userAxiosClient.post(ENDPOINTS.auth.login(), payload);
  // eslint-disable-next-line no-console
  console.log(res);
  const { data } = await userAxiosClient.get<LoginResponse>('auths/student/profile/');
  return { role: data.user.role };
};

export const logout = async (): Promise<void> => {
  ///
};
