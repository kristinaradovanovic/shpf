import type { SchemaType } from '@lib/types/types';
import type { HighlightCardSchemaType } from '@/schemas/highlightCard/highlightCard.types';

export interface PillarsGridBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description?: string;
  highlightCards: HighlightCardSchemaType[];
}
