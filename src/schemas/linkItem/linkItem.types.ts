import type { CtaLinkType, SchemaType } from '@lib/types/types';
import { FileAsset } from 'sanity';

export interface LinkItemSchemaType extends SchemaType {
  icon?: FileAsset;
  title: string;
  description?: string;
  ctaTitle?: string;
  ctaType?: 'page' | 'scroll' | 'link' | 'mail';
  ctaPage?: CtaLinkType;
  ctaScrollToIndex?: number;
  ctaLink?: string;
  ctaMail?: string;
}
