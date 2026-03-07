import type { ArrayMemberType, CtaLinkType, SchemaType } from '@lib/types/types';

export interface NavItemSchemaType extends SchemaType {
  title?: string;
  isTitleHidden?: boolean;
  pages?: (CtaLinkType & ArrayMemberType)[];
}
