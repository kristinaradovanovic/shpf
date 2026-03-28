import type { SchemaType } from '@lib/types/types';
import type { PortableTextBlock } from 'sanity';

export interface RichTextBlockLinkMark {
  _type: 'link';
  linkType: 'external' | 'mail';
  url?: string;
  emailAddress?: string;
}

export interface RichTextBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title?: string;
  richTextContent: PortableTextBlock[];
}
