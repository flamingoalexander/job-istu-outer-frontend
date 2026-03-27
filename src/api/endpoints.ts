const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
    byId: (id: number) => `companies/companies/${id}/`,
  },
  internships: {
    base: () => 'internship/',
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
};
export default ENDPOINTS;
