import { tokenStorage } from 'src/requests/token.storage';
import type { Credentials } from 'src/types/auth';
import type {
  LoginResponse,
  RequestError,
  UserCompanyBaseInput,
  UserInfoBaseInput,
} from '../requests';
import {
  getUserContactsRequest,
  getUserThemesRequest,
  patchUserCompanyRequest,
  patchUserInfoRequest,
} from '../requests';
import { getUserCompanyRequest, getUserInfoRequest } from '../requests';
import { userLoginRequest, userLogoutRequest } from '../requests';
import type { UserCompany, UserInfo, Contact, Theme } from 'src/types';
import { RequestErrorMessages } from 'src/constants/request.errors';

const isRequestError = (o: object): o is RequestError => {
  const obj = o as Record<string, unknown>;
  return (
    typeof obj.status === 'number' &&
    Object.values(RequestErrorMessages).includes(obj.message as RequestErrorMessages) &&
    obj.error instanceof Error
  );
};

export const login = async (payload: Credentials): Promise<void> => {
  const data: RequestError | LoginResponse = await userLoginRequest(payload);
  if (isRequestError(data)) {
    throw data.error;
  }
  tokenStorage.set(data.access, data.rememberMe);
};

export const logout = async (): Promise<void> => {
  const data = await userLogoutRequest();
  if (isRequestError(data)) {
    throw data.error;
  }
  tokenStorage.clear();
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const data: UserInfo | RequestError = await getUserInfoRequest();
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};

export const getUserCompany = async (): Promise<UserCompany> => {
  const data: UserCompany | RequestError = await getUserCompanyRequest();
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};
export const getUserThemes = async (): Promise<Theme[]> => {
  const data: Theme[] | RequestError = await getUserThemesRequest();
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};
export const getUserContacts = async (): Promise<Contact[]> => {
  const data: Contact[] | RequestError = await getUserContactsRequest();
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};

//update
export const updateUserInfo = async (payload: UserInfoBaseInput): Promise<UserInfo> => {
  const data: UserInfo | RequestError = await patchUserInfoRequest(payload);
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};
export const updateUserCompany = async (payload: UserCompanyBaseInput): Promise<UserCompany> => {
  const data: UserCompany | RequestError = await patchUserCompanyRequest(payload);
  if (isRequestError(data)) {
    throw data.error;
  }
  return data;
};
