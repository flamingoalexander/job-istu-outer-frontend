import axios from 'axios';

const API_URL = '/api';

const publicAxiosClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

export default publicAxiosClient;
