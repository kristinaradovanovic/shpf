import type { SchemaType } from '@lib/types/types';
export interface GlossarySchemaType extends SchemaType {
  term: string;
  definition: string;
}
