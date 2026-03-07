import { BackgroundColorTypes, ButtonColorTypes } from '@lib/styles/variables/colors';
import { ImageWithAltType, SchemaType } from '@lib/types/types';
import { CTAButtonItemSchemaType } from '@schemas/ctaButtonItem/ctaButtonItem.types';

export interface ImageCTACardSchemaType extends SchemaType {
  title: string;
  description: string;
  image: ImageWithAltType;
  ctaButton: CTAButtonItemSchemaType;
  buttonColor: ButtonColorTypes;
  backgroundColor: BackgroundColorTypes;
  imageOnRight?: boolean;
}
