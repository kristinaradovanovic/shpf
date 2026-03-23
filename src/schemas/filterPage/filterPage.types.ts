import type { ArrayMemberType, FieldType, ImageWithAltType } from '@lib/types/types';
import type { KeywordSchemaType } from '@schemas/keyword/keyword.types';

export interface FilterPageSeoType extends FieldType {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: (KeywordSchemaType & ArrayMemberType)[];
  includeInSearchEngines?: boolean;
  ogImage?: ImageWithAltType;
  ogImageAlt?: string;
}

export interface FilterPageSchemaType extends FieldType {
  _id: string;
  title: string;
  slug: string;
  tabLabel?: string;
  image?: ImageWithAltType;
  modules?: any[];
  seo?: FilterPageSeoType;
}
