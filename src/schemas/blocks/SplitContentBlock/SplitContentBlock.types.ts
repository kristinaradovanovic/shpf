import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface SplitContentBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  image: ImageWithAltType;
}
