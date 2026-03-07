import type { CtaLinkType, SchemaType } from '@lib/types/types';

export interface RichTextCTAButtonSchemaType extends SchemaType {
  ctaTitle?: string;
  ctaType?: 'page' | 'link' | 'mail' | 'scroll';
  ctaPage?: CtaLinkType;
  ctaLink?: string;
  ctaMail?: string;
  backgroundColor: string;
  position: 'left' | 'center' | 'right';
}
