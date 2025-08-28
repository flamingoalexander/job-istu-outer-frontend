const ENDPOINTS = {
  auth: {
    login: () => 'base/auth/',
    logout: () => 'base/auth/log_out',
    refresh: () => 'base/auth/refresh',
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
    getThemes: () => 'base/user/themes',
    getContacts: () => 'base/user/contact',

    getPractices: () => 'base/user/practice',
    postPractices: () => 'base/user/practice',

    patchInfo: () => 'base/user/info',
    patchCompany: () => 'base/user/company',

    postTheme: () => 'base/user/themes/',
    deleteTheme: () => 'base/user/themes/',

    postThemeToPractice: (themeId: number, practiceId: number) =>
      `base/user/practice/${practiceId}/themes/${themeId}/`,
    deleteThemeFromPractice: (themeId: number, practiceId: number) =>
      `base/user/practice/${practiceId}/themes/${themeId}/`,
  },
};
export default ENDPOINTS;
