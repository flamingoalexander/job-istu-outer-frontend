import { type StudentsInternship } from './models/StudentsInternship';
import { userAxiosClient } from './axios.clients';

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
    `/internship/students-internships/?student=${studentId}`,
  );
  return data;
};
