const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
    byId: (id: number) => `companies/companies/${id}/`,
  },
  internships: {
    byCompany: (companyId: number) =>
      `internship/?company=${companyId}`,
  },
  auth: {
    login: () => 'auths/dev-auth/login/',
    logout: () => 'auths/dev-auth/logout/',
  },
  users: {
    profileRepresentative: () => 'auths/company-representative/profile/',
  },
};
export default ENDPOINTS;
