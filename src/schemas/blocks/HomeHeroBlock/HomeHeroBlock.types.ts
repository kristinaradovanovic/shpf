import { ImageWithAltType, SchemaType } from '@lib/types/types';
import { CTAButtonItemSchemaType } from '@schemas/ctaButtonItem/ctaButtonItem.types';

export interface HomeHeroBlockSchemaType extends SchemaType {
  title: string;
  description: string;
  image: ImageWithAltType;
  ctaButton: CTAButtonItemSchemaType;
  memberCtaButton: CTAButtonItemSchemaType;
}
