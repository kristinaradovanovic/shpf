import type { ArrayMemberType, FieldType } from '@lib/types/types';
import { KeywordSchemaType } from '@schemas/keyword/keyword.types';
import { FileAsset } from 'sanity';
export interface NodeSchemaType extends FieldType {
  title?: string;
  slug: string;
  slugParent?: string;
  includeInSitemap?: boolean;
  includeInSearchEngines?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: (KeywordSchemaType & ArrayMemberType)[];
  ogImage?: FileAsset;
  ogImageAlt?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}
