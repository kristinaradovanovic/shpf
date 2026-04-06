import type { SchemaType } from '@lib/types/types';

export interface TitleAndDescriptionBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  positioning?: 'left' | 'center';
}
