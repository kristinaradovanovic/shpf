import type { SchemaType } from '@lib/types/types';

export interface TitleWithKeywordsItemSchemaType extends SchemaType {
  title: string;
  keywords: string[];
  description?: string;
}
