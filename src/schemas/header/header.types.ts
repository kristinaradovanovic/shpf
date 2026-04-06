import type { ArrayMemberType, LocalizedSchemaType, SchemaType } from '@lib/types/types';
import { HeaderCTAButtonItemSchemaType } from '@schemas/headerCtaButtonItem/headerCtaButtonItem.types';
import { HeaderItemSchemaType } from '@schemas/headerItem/headerItem.types';

export interface HeaderSchemaType extends SchemaType, LocalizedSchemaType {
  mainHeaderTitle?: string;
  headerItems?: (HeaderItemSchemaType & ArrayMemberType)[];
  ctaButton?: HeaderCTAButtonItemSchemaType;
}
