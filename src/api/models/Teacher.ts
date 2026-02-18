/* generated using openapi-typescript-codegen -- do not edit */
import type { ExtendedUser } from './ExtendedUser';
/**
 * Сериализатор для профиля преподавателя
 */
export type Teacher = {
  readonly id: number;
  readonly user: ExtendedUser;
  readonly post: string | null;
  readonly faculty: number | null;
  readonly faculty_name: string;
};
