import type { ImageWithAltType, SchemaType } from '@lib/types/types';
import type { HighlightCardColorTypes } from '@lib/styles/variables/colors';

export interface HighlightCardSchemaType extends SchemaType {
  title?: string;
  description?: string;
  icon: ImageWithAltType;
  colorVariant?: HighlightCardColorTypes;
}
