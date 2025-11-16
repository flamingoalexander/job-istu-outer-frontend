export type Institute = {
  id: number;
  name: string;
  image_url: string;
  ais_id: number;
  directions: Direction[];
};

export type Credentials = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type UserInfo = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Direction = {
  id: number;
  short_name: string;
  speciality_name: string;
  speciality_code: string;
  faculty: number;
  education_level: number;
  full_name: string;
  url: string;
};

export type Company = {
  id: number;
  name: string;
  argeement_date_begin: string;
  agreement_date_end: string;
  agreement: string;
  image_url: string;
  area_of_activity: string;
  head_full_name: string;
  head_job_title: string;
};
export type UserCompany = Company & {
  hire_count: number;
};
export type Contact = {
  id: number;
  type: number;
  value: string;
};
export enum ThemeTypes {
  PR = 'ПР',
  VKR = 'ВКР',
  NIOKR = 'НИОКР',
}
export type Theme = {
  id: number;
  title: string;
  type: ThemeTypes;
};
export type Practice = {
  id: number;
  company: Company;
  contacts: Contact[];
  themes: Theme[];
  faculty: number;
};

export type UserPractice = Practice & {
  company: number;
  faculty_name: string;
};

export type Internship = {
  title: string;
  company: string;
  specialities: string[];
  skills: string[];
};
