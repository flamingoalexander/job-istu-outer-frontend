/* generated using openapi-typescript-codegen -- do not edit */
import type { StudentsInternshipReportStatusEnum } from './StudentsInternshipReportStatusEnum';
/**
 * Сериализатор для модели StudentsInternshipReport (Отчет по практике)
 */
export type StudentsInternshipReport = {
  readonly id: number;
  status?: StudentsInternshipReportStatusEnum;
  readonly status_display: string;
  link?: string | null;
};
