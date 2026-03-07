import type { SchemaType } from '@lib/types/types';

export interface TestimonialSchemaType extends SchemaType {
  testimonialText: string;
  name: string;
  role: string;
  company: string;
}
