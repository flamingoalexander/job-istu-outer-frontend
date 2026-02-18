/* generated using openapi-typescript-codegen -- do not edit */
import type { EducationLevelEnum } from './EducationLevelEnum';
/**
 * Сериализатор для модели Speciality (Специальность)
 */
export type SpecialityRequest = {
  name: string;
  ais_id?: number | null;
  code: string;
  faculty?: number | null;
  education_level?: EducationLevelEnum | null;
};
