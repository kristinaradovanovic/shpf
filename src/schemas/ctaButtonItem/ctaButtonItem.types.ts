import type { CtaLinkType, SchemaType } from '@lib/types/types';

export interface CTAButtonItemSchemaType extends SchemaType {
  ctaTitle?: string;
  ctaType?: 'page' | 'scroll' | 'link' | 'mail';
  ctaPage?: CtaLinkType;
  ctaScrollToIndex?: number;
  ctaLink?: string;
  ctaMail?: string;
}
