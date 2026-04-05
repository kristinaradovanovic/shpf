import type { SchemaType } from '@lib/types/types';

export interface ContactDetailsSchemaType extends SchemaType {
  contactTitle?: string;
  subtitle?: string;
  name?: string;
  email?: string;
  phone?: string;
  addressTitle?: string;
  address?: string;
  postal?: string;
}
