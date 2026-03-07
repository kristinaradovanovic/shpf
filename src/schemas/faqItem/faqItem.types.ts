import type { SchemaType } from '@lib/types/types';
// import { faqCategorySchemaType } from '@schemas/faqCategory/faqCategory.types';

export interface FaqItemSchemaType extends SchemaType {
  question: string;
  answer: string;
}
