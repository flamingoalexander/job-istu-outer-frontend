/* generated using openapi-typescript-codegen -- do not edit */
import type { ExtendedUser } from './ExtendedUser';
import type { Company } from './Company';
/**
 * Сериализатор для профиля представителя компании
 */
export type CompanyRepresentative = {
  readonly id: number;
  readonly user: ExtendedUser;
  company: Company;
  job_title?: string | null;
  messenger?: string | null;
  email: string;
};
