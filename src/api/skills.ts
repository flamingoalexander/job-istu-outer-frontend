import { type Skill } from './models/Skill';
import publicAxiosClient from './axios.clients';
import ENDPOINTS from './endpoints';

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await publicAxiosClient.get<Skill[]>(ENDPOINTS.skills.list());
  return data;
};
