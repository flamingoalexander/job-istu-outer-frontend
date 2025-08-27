import { userHttpClient, authHttpClient } from 'src/api/http.clients';
import ENDPOINTS from 'src/constants/endpoints';
import { tokenStorage } from 'src/api/user/token.storage';

export type Credentials = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const login = async (payload: Credentials): Promise<void> => {
  try {
    const { data } = await authHttpClient.post(ENDPOINTS.auth.login(), payload);
    if (!data?.access) {
      throw new Error('No access token in response');
    }
    tokenStorage.set(data.access, payload.rememberMe);
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e));
  }
};

export const logout = async (): Promise<void> => {
  try {
    await userHttpClient.post(ENDPOINTS.auth.logout());
    tokenStorage.clear();
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e));
  }
};
