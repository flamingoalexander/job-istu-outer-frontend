import type { Credentials } from 'src/types/auth';
import type { UserCompany, UserInfo, Contact, Theme } from 'src/types';
import { ApiErrorMessages } from 'src/constants/request.errors';
import { authHttpClient, userHttpClient } from 'src/api/http.clients';
import ENDPOINTS from 'src/constants/endpoints';
import { validateObjSchema } from 'src/api/utils';
import {
  ContactsResponseSchema,
  LoginResponseSchema,
  ThemesResponseSchema,
  UserCompanyResponseSchema,
  UserInfoResponseSchema,
} from 'src/types/api.schemas';
import { ResponseError } from 'src/api/errors';
import { clearAccessToken, setAccessToken } from 'src/api/token.service';

export type UserCompanyBaseInput = Pick<
  UserCompany,
  'image_url' | 'name' | 'area_of_activity' | 'head_full_name' | 'hire_count'
>;

export type ApiLoginResponse = {
  rememberMe: boolean;
  access: string;
};
export type UserInfoBaseInput = Omit<UserInfo, 'username'>;
export const login = async (payload: Credentials): Promise<void> => {
  const { data } = await authHttpClient.post<ApiLoginResponse | { error: 'Wrong credentials' }>(
    ENDPOINTS.auth.login(),
    payload,
  );
  if ('error' in data) {
    throw new ResponseError(ApiErrorMessages.WRONG_CREDENTIALS);
  }
  if (!validateObjSchema(data, LoginResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  setAccessToken(data.access, data.rememberMe);
};

export const logout = async (): Promise<void> => {
  await userHttpClient.post<void>(ENDPOINTS.auth.logout());
  clearAccessToken();
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const { data } = await userHttpClient.get<UserInfo>(ENDPOINTS.user.getInfo());
  if (!validateObjSchema(data, UserInfoResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};

export const getUserCompany = async (): Promise<UserCompany> => {
  const { data } = await userHttpClient.get<UserCompany>(ENDPOINTS.user.getCompany());
  if (!validateObjSchema(data, UserCompanyResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};
export const getUserThemes = async (): Promise<Theme[]> => {
  const { data } = await userHttpClient.get<Theme[]>(ENDPOINTS.user.getThemes());
  if (!validateObjSchema(data, ThemesResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};
export const getUserContacts = async (): Promise<Contact[]> => {
  const { data } = await userHttpClient.get<Contact[]>(ENDPOINTS.user.getContacts());
  if (!validateObjSchema(data, ContactsResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};

//update
export const updateUserInfo = async (payload: UserInfoBaseInput): Promise<UserInfo> => {
  const { data } = await userHttpClient.patch<UserInfo>(ENDPOINTS.user.patchInfo(), payload);
  if (!validateObjSchema(data, UserInfoResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};
export const updateUserCompany = async (payload: UserCompanyBaseInput): Promise<UserCompany> => {
  const { data } = await userHttpClient.patch<UserCompany>(ENDPOINTS.user.patchCompany(), payload);
  if (!validateObjSchema(data, UserCompanyResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};
