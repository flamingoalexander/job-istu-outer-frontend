const ENDPOINTS = {
  companies: {
    companies: () => 'companies/companies/',
    byId: (id: number) => `companies/companies/${id}/`,
    contacts: {
      contacts: () => `/companies/contacts/`,
    },
  },
  internships: {
    list: () => '/internship/',
    byId: (id: number) => `/internship/${id}/`,
    requests: {
      getRequests: (internshipId: number) => `/internship/requests/${internshipId}`,
      approve: (id: number) => `/internship/requests/${id}/approve/`,
      decline: (id: number) => `/internship/requests/${id}/`,
    },
  },
  auth: {
    login: () => 'auths/outer/login',
    logout: () => 'auths/logout',
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
  users: {
    profileRepresentative: () => 'auths/company-representative/profile/',
  },
  skills: {
    list: () => '/internship/skills/',
  },
  specialities: {
    list: () => '/university/specialities/',
  },
};

export default ENDPOINTS;
