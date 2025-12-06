import axios from 'axios';
import { Cookies } from 'quasar';
const API_URL = '/api';

const publicAxiosClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

export const userAxiosClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

userAxiosClient.interceptors.request.use((config) => {
  const csrf = Cookies.get('csrftoken');
  if (csrf) {
    config.headers['X-CSRFToken'] = csrf;
  }
  return config;
});


export default publicAxiosClient;
