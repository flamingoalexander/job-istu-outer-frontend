const ENDPOINTS = {
  auth: {
    login: () => '/api/out/base/auth',
    logout: () => '/api/out/base/auth/log_out',
    refresh: () => '/api/out/base/auth/refresh',
  },
  faculty: {
    getAll: () => '/api/out/legacy/faculty',
    getById: (id: number) => `/api/out/legacy/faculty/${id}`,
  },
  practice: {
    getAll: () => '/api/out/base/practice',
    getById: (id: number) => `/api/out/base/practice/${id}`,
  },
  speciality: {
    getAll: () => '/api/out/legacy/speciality',
    getById: (id: number) => `/api/out/legacy/speciality/${id}`,
  },
};
export default ENDPOINTS;
