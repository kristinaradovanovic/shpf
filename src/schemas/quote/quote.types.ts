import type { ImageWithAltType, SchemaType } from '@lib/types/types';
import { AuthorSchemaType } from '@schemas/author/author.types';

export interface QuoteSchemaType extends SchemaType {
  quoteText: string;
  author: AuthorSchemaType;
  image: ImageWithAltType;
}
