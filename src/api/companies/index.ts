import { userAxiosClient } from '../axios.clients';
import { type Company } from 'src/api/models/Company';
import ENDPOINTS from '../endpoints';

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await userAxiosClient.get<Company[]>(ENDPOINTS.companies.companies());
  return data;
};

export const getCompanyById = async (id: number): Promise<Company> => {
  const { data } = await userAxiosClient.get<Company>(ENDPOINTS.companies.byId(id));
  return data;
};

export const updateCompany = async (id: number, payload: Partial<Company>): Promise<Company> => {
  const { data } = await userAxiosClient.put<Company>(ENDPOINTS.companies.byId(id), payload);
  return data;
};

//Company Representative
export interface Contact {
  id: number;
  contact_type?: string;
  full_name: string;
  value?: string;
  job_title?: string;
  company: number;
}

export interface Internship {
  id: number;
  theme: string;
  description: string;
  year: number;
}

export interface Candidate {
  id: number;
  student_name: string;
  status: number;
}

export const getContacts = async (): Promise<Contact[]> => {
  const { data } = await userAxiosClient.get('/companies/contacts/');
  return data;
};

export const getInternshipData = async (internshipId: number): Promise<Internship> => {
  const { data } = await userAxiosClient.get(`/internship/${internshipId}/`);
  return data;
};

export const getCandidates = async (internshipId: number): Promise<Candidate[]> => {
  const { data } = await userAxiosClient.get(`/internship/requests/`, {
    params: { internship: internshipId },
  });
  return data;
};

export const approveRequest = async (requestId: number): Promise<void> => {
  await userAxiosClient.post(`/internship/requests/${requestId}/approve/`);
};

export const declineRequest = async (requestId: number): Promise<void> => {
  await userAxiosClient.delete(`/internship/requests/${requestId}/`);
};

export const closeInternship = async (internshipId: number): Promise<void> => {
  await userAxiosClient.delete(`/internship/${internshipId}/`);
};
