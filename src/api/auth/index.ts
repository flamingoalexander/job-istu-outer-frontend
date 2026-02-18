import { type Credentials } from 'src/api/models/Credentials';
import { UserRoles } from 'src/constants';

export const login = async (payload: Credentials): Promise<{ role: UserRoles }> => {
  //response imitation
  return Promise.resolve({ role: UserRoles.Student });
  //const { data } = await userAxiosClient.post(ENDPOINTS.auth.login(), payload);
};

export const logout = async (): Promise<void> => {
  ///
};
