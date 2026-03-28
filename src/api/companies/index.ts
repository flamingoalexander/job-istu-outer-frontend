import { userAxiosClient } from '../axios.clients';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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
  title: string;
  description: string;
}

export interface Candidate {
  id: number;
  student_name: string;
  status: number;
}

const internshipId = computed(() => {
  const id = route.params.id;
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
});

export const getContacts = async (): Promise<Contact[]> => {
  const response = await userAxiosClient.get('/companies/contacts/');
  console.warn(response.data);
  return response.data;
};

export const getInternshipData = async (): Promise<Internship | null> => {
  const internship_id = internshipId.value;
  if (!internship_id) {
    console.warn('ID стажировки не найден');
    return null;
  }
  const response = await userAxiosClient.get(`/internship/${internship_id}/`);
  console.warn(response.data);
  return response.data;
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await userAxiosClient.get(`/internship/requests/`);
  console.warn(response.data);
  return response.data;
};

export const approveRequest = async (requestId: number): Promise<void> => {
  await userAxiosClient.post(`/internship/requests/${requestId}/approve/`);
  console.warn('Заявка принята');
};

export const declineRequest = async (requestId: number): Promise<void> => {
  await userAxiosClient.delete(`/internship/requests/${requestId}/`);
  console.warn('Заявка отклонена');
};

export const closeInternship = async (internshipId: number): Promise<void> => {
  await userAxiosClient.delete(`/internship/${internshipId}/`);
  console.warn('Практика закрыта');
};
