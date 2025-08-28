import type { Credentials } from 'src/types/auth';
import { authHttpClient, userHttpClient } from 'src/requests/http.clients';
import ENDPOINTS from 'src/constants/endpoints';
import { RequestErrorMessages } from 'src/constants/request.errors';
import axios from 'axios';
import { validateObjSchema } from 'src/api/utils';
import {
  ContactsResponseSchema,
  LoginResponseSchema,
  ThemesResponseSchema,
  UserCompanyResponseSchema,
  UserInfoResponseSchema,
} from 'src/types/api.dto';
import { ResponseError } from 'src/api/errors';
import type { Contact, Theme, UserCompany, UserInfo } from 'src/types';

export type RequestError = {
  status: number;
  message: RequestErrorMessages;
  error: Error;
};

export type LoginResponse = {
  rememberMe: boolean;
  access: string;
};

export const userLoginRequest = async (
  payload: Credentials,
): Promise<LoginResponse | RequestError> => {
  try {
    const response = await authHttpClient.post(ENDPOINTS.auth.login(), payload);
    const { data } = response;
    if (data.error === 'Wrong credentials') {
      return {
        status: response.status,
        message: RequestErrorMessages.WRONG_CREDENTIALS,
        error: new ResponseError(RequestErrorMessages.WRONG_CREDENTIALS),
      };
    }
    if (validateObjSchema(data, LoginResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export type LogoutResponse = {
  ok: true;
};

export const userLogoutRequest = async (): Promise<LogoutResponse | RequestError> => {
  try {
    const response = await userHttpClient.post(ENDPOINTS.auth.logout());
    if (response.status === 200) {
      return {
        ok: true,
      };
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export const getUserInfoRequest = async (): Promise<UserInfo | RequestError> => {
  try {
    const response = await userHttpClient.get(ENDPOINTS.user.getInfo());
    const { data } = response;
    if (validateObjSchema(data, UserInfoResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export const getUserCompanyRequest = async (): Promise<UserCompany | RequestError> => {
  try {
    const response = await userHttpClient.get(ENDPOINTS.user.getCompany());
    const { data } = response;
    if (validateObjSchema(data, UserCompanyResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export const getUserThemesRequest = async (): Promise<Theme[] | RequestError> => {
  try {
    const response = await userHttpClient.get(ENDPOINTS.user.getThemes());
    const { data } = response;
    if (validateObjSchema(data, ThemesResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export const getUserContactsRequest = async (): Promise<Contact[] | RequestError> => {
  try {
    const response = await userHttpClient.get(ENDPOINTS.user.getContacts());
    const { data } = response;
    if (validateObjSchema(data, ContactsResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export type UserInfoBaseInput = Omit<UserInfo, 'username'>;

export const patchUserInfoRequest = async (
  payload: UserInfoBaseInput,
): Promise<UserInfo | RequestError> => {
  try {
    const response = await userHttpClient.patch(ENDPOINTS.user.patchInfo(), payload);
    const { data } = response;
    if (validateObjSchema(data, UserInfoResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};

export type UserCompanyBaseInput = Pick<
  UserCompany,
  'image_url' | 'name' | 'area_of_activity' | 'head_full_name' | 'hire_count'
>;

export const patchUserCompanyRequest = async (
  payload: UserCompanyBaseInput,
): Promise<UserCompany | RequestError> => {
  try {
    const response = await userHttpClient.patch(ENDPOINTS.user.patchCompany(), payload);
    const { data } = response;
    if (validateObjSchema(data, UserCompanyResponseSchema)) {
      return data;
    }
    return {
      status: response.status,
      message: RequestErrorMessages.WRONG_SERVER_RESPONSE,
      error: new ResponseError(RequestErrorMessages.WRONG_SERVER_RESPONSE),
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: e.response?.status || 0,
        message: RequestErrorMessages.AXIOS_ERROR,
        error: e,
      };
    }
    throw e;
  }
};
