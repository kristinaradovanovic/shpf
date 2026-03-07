import type { ArrayMemberType, CtaLinkType, SchemaType } from '@lib/types/types';

export interface FooterItemSchemaType extends SchemaType {
  page: CtaLinkType;
  sublinks?: (CtaLinkType & ArrayMemberType)[];
}
