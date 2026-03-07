import type { SchemaType } from '@lib/types/types';
import { LinkItemSchemaType } from '@schemas/linkItem/linkItem.types';

export interface ListItemSchemaType extends SchemaType {
  title: string;
  item: LinkItemSchemaType;
}
