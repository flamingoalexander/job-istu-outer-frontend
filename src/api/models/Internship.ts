/* generated using openapi-typescript-codegen -- do not edit */
/**
 * Сериализатор для модели Internship (Практика)
 */
export type Internship = {
  readonly id: number;
  theme: string;
  description?: string | null;
  year: number;
  hire_count?: number;
  company?: number | null;
  readonly company_name: string;
  contacts: Array<number>;
  readonly contacts_list: string;
  skills: Array<number>;
  readonly skills_list: string;
  specialities: Array<number>;
  readonly specialities_list: string;
};
