import type { ArrayMemberType, CtaLinkType, SchemaType } from '@lib/types/types';

export interface HeaderItemSchemaType extends SchemaType {
  page: CtaLinkType;
  sublinks?: (CtaLinkType & ArrayMemberType)[];
}
