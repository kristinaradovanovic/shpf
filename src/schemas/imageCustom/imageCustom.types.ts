import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface ImageCustomSchemaType extends SchemaType {
  image: ImageWithAltType;
}
