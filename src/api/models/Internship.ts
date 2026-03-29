/* generated using openapi-typescript-codegen -- do not edit */
/**
 * Сериализатор для модели Internship (Практика)
 */
export type Skill = {
  id: number;
  name: string;
};

export type Speciality = {
  id: number;
  name: string;
  code: string;
};

export type Contact = {
  id: number;
  name: string;
  job_title: string;
  contact_type: string;
  value: string;
};

export type Internship = {
  readonly id: number;
  theme: string;
  description?: string | null;
  year: number;
  hire_count?: number;
  company?: number | null;
  readonly company_name: string;
  contacts: Array<number>;
  readonly contacts_list: Contact[];
  skills: Array<number>;
  readonly skills_list: Skill[];
  specialities: Array<number>;
  readonly specialities_list: Speciality[];
};
