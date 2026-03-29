import { type StudentsInternship } from './models/StudentsInternship';
import { userAxiosClient } from './axios.clients';
import ENDPOINTS from './endpoints';

export const getInternshipParticipants = async (
  internshipId: number,
): Promise<StudentsInternship[]> => {
  const { data } = await userAxiosClient.get<StudentsInternship[]>(
    `/internship/students-internships/?internship=${internshipId}`,
  );
  return data;
};

export const getStudentInternships = async (studentId: number): Promise<StudentsInternship[]> => {
  const { data } = await userAxiosClient.get<StudentsInternship[]>(
    `${ENDPOINTS.studentsInternships.list()}?student=${studentId}`,
  );
  return data;
};
