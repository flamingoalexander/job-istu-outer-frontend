import publicAxiosClient from 'src/api/axios.clients';
import ENDPOINTS from 'src/api/endpoints';
import { type StudentsInternship } from 'src/api';

export type GetStudentInternshipsFilterParams = {
  internshipId?: number;
  ordering?: string;
  search?: string;
  status?: 0 | 1 | 2 | 3;
  studentId?: number;
  teacherId?: number;
};
export const getStudentInternships = async (
  params: GetStudentInternshipsFilterParams,
): Promise<StudentsInternship[]> => {
  const { data } = await publicAxiosClient.get<StudentsInternship[]>(
    ENDPOINTS.studentsInternships.list(),
    {
      params: {
        internship: params.internshipId,
        ordering: params.ordering,
        search: params.search,
        status: params.status,
        student: params.studentId,
        teacher: params.teacherId,
      },
    },
  );
  return data;
};
