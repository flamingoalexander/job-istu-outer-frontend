import { type Speciality } from './models/Speciality';
import publicAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getSpecialities = async (): Promise<Speciality[]> => {
  const { data } = await publicAxiosClient.get<Speciality[]>(ENDPOINTS.specialities.list());
  return data;
};
