const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
    byId: (id: number) => `companies/companies/${id}/`,
    contacts:{
      contacts:()=>`/companies/contacts/`
    }
  },
  internships: {
    base: () => 'internship/',
    byId: (id:number) => `/internship/${id}/`,
  },
  requests: {
    requests:() => `/internship/requests/`,
    approve: (id: number) => `internship/requests/${id}/approve/`,
    decline: (id: number) => `internship/requests/${id}/`,
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
