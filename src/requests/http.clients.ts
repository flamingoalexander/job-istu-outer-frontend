import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { tokenStorage } from 'src/requests/token.storage';
import { TokenRefreshError } from 'src/api/errors';
import ENDPOINTS from 'src/constants/endpoints';

const API_URL = '/api/out';

const publicHttpClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

const authHttpClient = axios.create({
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
    const { data } = await authHttpClient.post<{ access: string }>(ENDPOINTS.auth.refresh());
    return data.access;
  } catch {
    throw new TokenRefreshError('Failed to refresh access token');
  }
};

userHttpClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
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
      return Promise.reject(error);
    }
    cfg._retry = true;
    const newAccess = await refreshAccessToken();
    tokenStorage.refresh(newAccess);
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${newAccess}`;
    return userHttpClient.request(cfg);
  },
);

export { userHttpClient, publicHttpClient, authHttpClient };
