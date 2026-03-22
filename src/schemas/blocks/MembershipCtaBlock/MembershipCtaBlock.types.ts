import { CTAButtonItemSchemaType } from '@/schemas/ctaButtonItem/ctaButtonItem.types';
import { HighlightCardSchemaType } from '@/schemas/highlightCard/highlightCard.types';
import type { SchemaType } from '@lib/types/types';

export interface MembershipCtaBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  highlightCards: HighlightCardSchemaType[];
  ctaButton?: CTAButtonItemSchemaType;
}
