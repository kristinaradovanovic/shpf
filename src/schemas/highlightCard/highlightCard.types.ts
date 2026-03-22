import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface HighlightCardSchemaType extends SchemaType {
  title?: string;
  description?: string;
  icon: ImageWithAltType;
}
