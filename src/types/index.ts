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
