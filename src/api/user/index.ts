import { tokenStorage } from 'src/api/user/token.storage';
import type { Credentials } from 'src/types/auth';
import { getUserCompanyRequest, getUserInfoRequest, RequestError } from 'src/api/requests';
import { userLoginRequest, userLogoutRequest } from 'src/api/requests';
import { UserCompany, UserInfo } from 'src/types';



export const login = async (payload: Credentials): Promise<void> => {
  const data = await userLoginRequest(payload);
  if ('access' in data) {
    tokenStorage.set(data.access, data.rememberMe);
    return;
  }//TODO исправить это
  throw (data as RequestError).error;
};

export const logout = async (): Promise<void> => {
  const data = await userLogoutRequest();
  if ('ok' in data) {
    tokenStorage.clear();
    return;
  }
  throw data.error;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const data = await getUserInfoRequest();
  if ('username' in data) {
    return data;
  }
  throw (data as RequestError).error;
};

export const getUserCompany = async (): Promise<UserCompany> => {
  const data = await getUserCompanyRequest();
  if ('name' in data) {
    return data;
  }
  throw (data as RequestError).error;
};
