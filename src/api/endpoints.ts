const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
    byId: (id: number) => `companies/companies/${id}/`,
  },
  auth: {
    login: () => 'auths/dev-auth/login/',
    logout: () => 'auths/dev-auth/logout/',
    esia: () => 'auths/login/',
    me: () => 'auths/me/',
  },
  users: {
    profileRepresentative: () => 'auths/company-representative/profile/',
  },
  internships: {
    list: () => '/internship/',
  },
  skills: {
    list: () => '/internship/skills/',
  },
  specialities: {
    list: () => '/university/specialities/',
  },
};
export default ENDPOINTS;
