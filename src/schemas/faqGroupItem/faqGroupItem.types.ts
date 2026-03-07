import type { ArrayMemberType, SchemaType } from '@lib/types/types';
import { FaqItemSchemaType } from '@schemas/faqItem/faqItem.types';

export interface FaqGroupItemSchemaType extends SchemaType {
  title: string;
  items: (FaqItemSchemaType & ArrayMemberType)[];
}
