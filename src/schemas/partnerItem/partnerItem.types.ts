import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface PartnerItemSchemaType extends SchemaType {
  image: ImageWithAltType;
  partnerName: string;
}
