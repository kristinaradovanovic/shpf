import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface BulletPointSchemaType extends SchemaType {
  title?: string;
  description?: string;
  icon: ImageWithAltType;
}
