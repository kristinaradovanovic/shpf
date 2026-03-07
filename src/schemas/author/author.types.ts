import type { SchemaType } from '@lib/types/types';
export interface AuthorSchemaType extends SchemaType {
  name: string;
  email?: string;
  role?: string;
}
