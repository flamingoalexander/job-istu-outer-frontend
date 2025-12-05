/* generated using openapi-typescript-codegen -- do not edit */
import type { ExtendedUser } from './ExtendedUser';
/**
 * Сериализатор для профиля студента
 */
export type Student = {
  readonly id: number;
  readonly user: ExtendedUser;
  group?: number | null;
  readonly group_name: string;
};
