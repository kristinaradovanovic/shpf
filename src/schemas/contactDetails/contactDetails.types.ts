import type { SchemaType } from '@lib/types/types';
import { ExternalLinkSchemaType } from '@schemas/externalLink/externalLink.types';

export interface ContactDetailsSchemaType extends SchemaType {
  contactTitle?: string;
  subtitle?: string;
  name?: string;
  email?: string;
  phone?: string;
  addressTitle?: string;
  address?: string;
  postal?: string;
  whistleblower?: ExternalLinkSchemaType;
}
