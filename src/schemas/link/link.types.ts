import type { CtaLinkType, SchemaType } from '@lib/types/types';

export interface LinkSchemaType extends SchemaType {
  title: string;
  description?: string;
  page: CtaLinkType;
}
