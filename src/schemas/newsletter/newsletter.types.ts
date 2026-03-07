import type { SchemaType } from '@lib/types/types';

export interface NewsletterSchemaType extends SchemaType {
  showNewsletter?: boolean;
  title?: string;
  inputPlaceholder?: string;
  confirmationMessage?: string;
  errorMessage?: string;
  invalidInputMessage?: string;
  apiKey?: string;
  audienceId?: string;
  serverRegion?: string;
}
