import type { CtaLinkType, SchemaType } from '@lib/types/types';

export interface HeaderCTAButtonItemSchemaType extends SchemaType {
  ctaTitle?: string;
  ctaPage?: CtaLinkType;
}
