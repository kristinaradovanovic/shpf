import { BackgroundColorTypes, ButtonColorTypes } from '@lib/styles/variables/colors';
import type { ImageWithAltType, SchemaType } from '@lib/types/types';
import { CTAButtonItemSchemaType } from '@schemas/ctaButtonItem/ctaButtonItem.types';

export interface CardItemSchemaType extends SchemaType {
  image: ImageWithAltType;
  title: string;
  description: string;
  ctaButton: CTAButtonItemSchemaType;
  buttonColor: ButtonColorTypes;
  backgroundColor: BackgroundColorTypes;
}
