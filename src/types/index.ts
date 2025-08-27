export type Institute = {
  id: number;
  name: string;
  image_url: string;
  ais_id: number;
  directions: Direction[];
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

export type Contact = {
  id: number;
  type: number;
  value: string;
};

export type Theme = {
  id: 0;
  title: string;
  type: string;
};
export type Practice = {
  id: number;
  company: Company;
  contacts: Contact[];
  themes: Theme[];
  faculty: number;
};
