import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export type StudentProfile = {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    patronymic: string | null;
    roles: Array<{ name: string }>;
  };
  group: number;
};

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const { data } = await userAxiosClient.get<StudentProfile>(ENDPOINTS.auth.studentProfile);
  return data;
};
