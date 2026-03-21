import type { ImageWithAltType, SchemaType } from '@lib/types/types';
import { CTAButtonItemSchemaType } from '../ctaButtonItem/ctaButtonItem.types';

export interface ContentItemSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  ctaButton?: CTAButtonItemSchemaType;
  image?: ImageWithAltType;
}
