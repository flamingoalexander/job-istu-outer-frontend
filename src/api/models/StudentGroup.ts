/* generated using openapi-typescript-codegen -- do not edit */
import type { Stream } from './Stream';
/**
 * Сериализатор для модели StudentGroup (Группа)
 */
export type StudentGroup = {
  readonly id: number;
  group_number: string;
  stream?: number | null;
  readonly stream_info: Stream;
  readonly full_name: string;
};
