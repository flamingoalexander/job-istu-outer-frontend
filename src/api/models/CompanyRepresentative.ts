/* generated using openapi-typescript-codegen -- do not edit */
import type { ExtendedUser } from './ExtendedUser';
/**
 * Сериализатор для профиля представителя компании
 */
export type CompanyRepresentative = {
  readonly id: number;
  readonly user: ExtendedUser;
  job_title?: string | null;
  messenger?: string | null;
  email: string;
};
