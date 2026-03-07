import type { SchemaType } from '@lib/types/types';

export interface RedirectSchemaType extends SchemaType {
  source: string;
  destination: string;
  permanent: boolean;
}
