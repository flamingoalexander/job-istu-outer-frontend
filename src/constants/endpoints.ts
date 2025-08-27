const ENDPOINTS = {
  auth: {
    login: () => 'base/auth/',
    logout: () => 'base/auth/log_out/',
    refresh: () => 'base/auth/refresh/',
  },
  faculty: {
    getAll: () => 'legacy/faculty',
    getById: (id: number) => `legacy/faculty/${id}`,
  },
  practice: {
    getAll: () => 'base/practice',
    getById: (id: number) => `base/practice/${id}`,
  },
  speciality: {
    getAll: () => 'legacy/speciality',
    getById: (id: number) => `legacy/speciality/${id}`,
  },
  user: {
    getInfo: () => 'base/user/info',
    getCompany: () => 'base/user/company',
  },
};
export default ENDPOINTS;
