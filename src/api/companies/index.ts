import { ref, computed } from 'vue';
import axios from 'axios';
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

export const getContacts = async () => {
  const contacts = ref<Contact[]>([]);

  try {
    const response = await axios.get('/backend/api/companies/contacts/');
    contacts.value = response.data;
    console.warn(contacts.value);
  } catch (error) {
    console.error(error, 'Что-то пошло не так');
  }

  return contacts;
};

export const getInternshipData = async () => {
  const internshipData = ref<Internship>();

  const internship_id = internshipId.value;
  const response = await axios.get(`/backend/api/internship/${internship_id}/`);
  internshipData.value = response.data;
  console.warn(internshipData.value);
  return internshipData;
};

export const getCandidates = async () => {
  const candidates = ref<Candidate[]>([]);
  const response = await axios.get(`/backend/api/internship/requests/`);
  candidates.value = response.data;
  console.warn(candidates.value);
  return candidates;
};

export const approveRequest = async (requestId: number) => {
 
    const response = await axios.post(`/backend/api/internship/requests/${requestId}/approve/`);
    console.warn('Заявка принята');
    return response.data;
};
export const declineRequest = async (requestId: number) => {
    const response = await axios.delete(`/backend/api/internship/requests/${requestId}`);
    console.warn('Заявка отклонена');
    return response.data;
};

export const closeInternship = async (internshipId?: number) => {
    const response = await axios.delete(`/backend/api/internship/${internshipId}`);
    console.warn('Практика закрыта');
    return response.data;
};
