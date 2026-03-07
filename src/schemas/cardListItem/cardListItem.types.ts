import type { ArrayMemberType, ImageWithAltType, SchemaType } from '@lib/types/types';
import { CTAButtonItemSchemaType } from '@schemas/ctaButtonItem/ctaButtonItem.types';

export interface CardListItemSchemaType extends SchemaType {
  image: ImageWithAltType;
  position: 'left' | 'right';
  title: string;
  description: string;
  checklistItems: (string & ArrayMemberType)[];
  ctaButtons: (CTAButtonItemSchemaType & ArrayMemberType)[];
}
