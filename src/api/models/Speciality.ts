/* generated using openapi-typescript-codegen -- do not edit */
import type { EducationLevelEnum } from './EducationLevelEnum';
/**
 * Сериализатор для модели Speciality (Специальность)
 */
export type Speciality = {
  readonly id: number;
  name: string;
  ais_id?: number | null;
  code: string;
  faculty?: number | null;
  readonly faculty_name: string;
  education_level?: EducationLevelEnum | null;
  readonly education_level_display: string;
};
