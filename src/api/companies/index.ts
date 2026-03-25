import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

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

  try {
    const response = await axios.get(`/backend/api/internship/${internship_id}/`);
    internshipData.value = response.data;
    console.warn(internshipData.value);
  } catch (error) {
    console.error(error);
  }
  return internshipData;
};

export const getCandidates = async () => {
  const candidates = ref<Candidate[]>([]);
  try {
    const response = await axios.get(`/backend/api/internship/requests/`);
    candidates.value = response.data;
    console.warn(candidates.value);
  } catch (error) {
    console.error(error);
  }
  return candidates;
};

export const approveRequest = async (requestId: number) => {
  const $q = useQuasar();
  try {
    const response = await axios.post(`/backend/api/internship/requests/${requestId}/approve/`);
    console.warn('Заявка принята');
    $q.notify({
      message: 'Заявка успешно принята!',
      color: 'positive',
    });
    return response.data;
  } catch (error) {
    console.error(error, 'Произошла ошибка при принятии заявки');
    $q.notify({
      message: 'Ошибка при принятии заявки!',
      color: 'negative',
    });
  }
};
export const declineRequest = async (requestId: number) => {
  const $q = useQuasar();
  try {
    const response = await axios.delete(`/backend/api/internship/requests/${requestId}`);
    console.warn('Заявка отклонена');
    $q.notify({
      message: 'Заявка отклонена!',
      color: 'positive',
    });
    return response.data;
  } catch (error) {
    console.warn(error, 'Ошибка при удалении');
    $q.notify({
      message: 'Ошибка при отклонении!',
      color: 'negative',
    });
  }
};

export const closeInternship = async (internshipId?: number) => {
  const $q = useQuasar();
  try {
    const response = await axios.delete(`/backend/api/internship/${internshipId}`);
    console.warn('Практика закрыта');
    $q.notify({
      message: 'Вы закрыли практику!',
      color: 'positive',
    });
    return response.data;
  } catch (error) {
    console.warn(error, 'Ошибка при удалении');
    $q.notify({
      message: 'Ошибка при отклонении!',
      color: 'negative',
    });
  }
};
