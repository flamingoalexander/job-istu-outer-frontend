/* generated using openapi-typescript-codegen -- do not edit */
import type { InternshipTypeEnum } from './InternshipTypeEnum';
import type { StudentsInternshipStatusEnum } from './StudentsInternshipStatusEnum';
/**
 * Сериализатор для модели StudentsInternship (Практика студента)
 */
export type StudentsInternship = {
  readonly id: number;
  student?: number | null;
  readonly student_name: string;
  internship?: number | null;
  readonly internship_theme: string;
  teacher?: number | null;
  readonly teacher_name: string;
  status?: StudentsInternshipStatusEnum;
  readonly status_display: string;
  internship_type?: InternshipTypeEnum;
  readonly internship_type_display: string;
  readonly created_at: string;
};
