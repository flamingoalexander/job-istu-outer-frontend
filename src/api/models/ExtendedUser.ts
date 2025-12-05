/* generated using openapi-typescript-codegen -- do not edit */
import type { RoleEnum } from './RoleEnum';
/**
 * Сериализатор для базовой информации о пользователе
 */
export type ExtendedUser = {
  readonly id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  readonly username: string;
  email?: string | null;
  first_name?: string;
  last_name?: string;
  patronymic?: string | null;
  readonly role: RoleEnum;
};
