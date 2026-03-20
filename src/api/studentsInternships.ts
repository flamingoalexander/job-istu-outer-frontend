import { type StudentsInternship } from './models/StudentsInternship';
import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export const getStudentInternships = async (studentId: number): Promise<StudentsInternship[]> => {
  const { data } = await userAxiosClient.get<StudentsInternship[]>(
    `${ENDPOINTS.studentsInternships.list()}?student=${studentId}`,
  );
  return data;
};
