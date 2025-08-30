import type { Credentials } from 'src/types/auth';
import type { UserCompany, UserInfo, Contact, Theme, UserPractice } from 'src/types';
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
  UserPracticeResponseSchema,
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

export const getUserPractice = async (): Promise<UserPractice[]> => {
  const { data } = await userHttpClient.get<UserPractice[]>(ENDPOINTS.user.getPractices());
  if (!validateObjSchema(data, UserPracticeResponseSchema)) {
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

//create
export type UserThemeBaseInput = Omit<Theme, 'id'>;
export const createUserTheme = async (payload: UserThemeBaseInput): Promise<Theme> => {
  const { data } = await userHttpClient.post<Theme>(ENDPOINTS.user.postTheme(), payload);
  if (!validateObjSchema([data], ThemesResponseSchema)) {
    throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  }
  return data;
};

export type UserPracticeBaseInput = {
  faculty: number;
  company: number;
};

export const createUserPractice = async (payload: UserPracticeBaseInput): Promise<UserPractice> => {
  const { data } = await userHttpClient.post<UserPractice>(ENDPOINTS.user.postPractices(), payload);
  // if (!validateObjSchema([data], Prac)) {
  //   throw new ResponseError(ApiErrorMessages.WRONG_SERVER_RESPONSE);
  // }
  return data;
};

//delete
export const deleteUserTheme = async (themeId: number): Promise<void> => {
  await userHttpClient.delete<UserCompany>(ENDPOINTS.user.deleteTheme(themeId));
};

//associate
export const associateThemeToPractice = async (
  themeId: number,
  practiceId: number,
): Promise<void> => {
  await userHttpClient.post<UserCompany>(ENDPOINTS.user.postThemeToPractice(themeId, practiceId));
};
export const dissociateThemeFromPractice = async (
  themeId: number,
  practiceId: number,
): Promise<void> => {
  await userHttpClient.delete<UserCompany>(
    ENDPOINTS.user.deleteThemeFromPractice(themeId, practiceId),
  );
};
