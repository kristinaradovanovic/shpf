import { CTAButtonItemSchemaType } from '@/schemas/ctaButtonItem/ctaButtonItem.types';
import { PartnerItemSchemaType } from '@/schemas/partnerItem/partnerItem.types';
import type { SchemaType } from '@lib/types/types';

export interface PartnersCtaBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  partners: PartnerItemSchemaType[];
  ctaButton?: CTAButtonItemSchemaType;
}
