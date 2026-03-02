const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
  },
  auth: {
    login: () => 'auths/dev-auth/login/',
    logout: () => 'auths/dev-auth/logout/',
    esia: () => 'auths/login/',
    me: () => 'auths/me/',
  },
};
export default ENDPOINTS;
