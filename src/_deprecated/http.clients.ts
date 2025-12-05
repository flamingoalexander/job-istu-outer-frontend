import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { TokenRefreshError } from 'src/api/errors';
import ENDPOINTS from 'src/constants/endpoints';
import { getAccessToken, updateAccessToken } from 'src/api/token.service';
import { useUserStore } from 'stores/user';

const API_URL = '/api/out';

const publicHttpClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

const userHttpClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const refreshAccessToken = async (): Promise<string> => {
  try {
    const { data } = await publicHttpClient.post<{ access: string }>(ENDPOINTS.auth.refresh());
    return data.access;
  } catch {
    throw new TokenRefreshError('Failed to refresh access token');
  }
};

userHttpClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error(String(error)));
  },
);

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

userHttpClient.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const cfg = (error.config ?? {}) as RetryConfig;

    if (status !== 401 || cfg._retry) {
      const userStore = useUserStore(); // не уверен что его можно так использовать.
      userStore.isAuthenticated = false;
      return Promise.reject(error);
    }
    cfg._retry = true;
    const newAccess = await refreshAccessToken();
    updateAccessToken(newAccess);
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${newAccess}`;
    return userHttpClient.request(cfg);
  },
);

export { userHttpClient, publicHttpClient };
