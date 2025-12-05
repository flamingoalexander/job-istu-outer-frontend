/* generated using openapi-typescript-codegen -- do not edit */
/**
 * Сериализатор для модели Internship (Практика)
 */
export type InternshipRequest = {
  theme: string;
  description?: string | null;
  year: number;
  hire_count?: number;
  company?: number | null;
  contacts: Array<number>;
  skills: Array<number>;
  specialities: Array<number>;
};
