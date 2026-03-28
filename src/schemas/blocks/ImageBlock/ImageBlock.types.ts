import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface ImageBlockItem {
  _type: 'object';
  _key: string;
  image: ImageWithAltType;
  horizontalAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
}

export interface ImageBlockSchemaType extends SchemaType {
  images: ImageBlockItem[];
}
