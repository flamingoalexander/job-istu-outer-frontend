const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
  },
  auth: {
    login: () => 'auths/dev-auth/login/',
    logout: () => 'auths/dev-auth/logout/',
    esia: () => 'auths/login/',
    me: () => 'auths/me/',
    studentProfile: 'auths/student/profile/',
  },
  studentsInternships: {
    list: () => '/internship/students-internships/',
    byId: (id: number) => `/internship/students-internships/${id}/`,
  },
  internship: {
    byId: (id: number) => `/internship/${id}/`,
  },
};
export default ENDPOINTS;
