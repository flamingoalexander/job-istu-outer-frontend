/* generated using openapi-typescript-codegen -- do not edit */
import type { InternshipTypeEnum } from './InternshipTypeEnum';
import type { StudentsInternshipStatusEnum } from './StudentsInternshipStatusEnum';
/**
 * Сериализатор для модели StudentsInternship (Практика студента)
 */
export type StudentsInternshipRequest = {
  student?: number | null;
  internship?: number | null;
  teacher?: number | null;
  status?: StudentsInternshipStatusEnum;
  internship_type?: InternshipTypeEnum;
};
