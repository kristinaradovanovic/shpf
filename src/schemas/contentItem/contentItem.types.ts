import { BackgroundColorTypes } from '@lib/styles/variables/colors';
import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface ContentItemSchemaType extends SchemaType {
  title: string;
  description: string;
  icon: ImageWithAltType;
  backgroundColor: BackgroundColorTypes;
}
