import { SchemaType } from '@lib/types/types';
import { PortableTextBlock } from 'sanity';

export interface RichTextItemsSchemaType extends SchemaType {
  richTextItems: PortableTextBlock[];
}
