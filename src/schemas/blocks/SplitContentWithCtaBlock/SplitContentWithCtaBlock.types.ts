import type { SchemaType } from '@lib/types/types';
import type { ContentItemSchemaType } from '@schemas/contentItem/contentItem.types';

export interface SplitContentWithCtaBlockSchemaType extends SchemaType {
  contentItems: ContentItemSchemaType[];
}
