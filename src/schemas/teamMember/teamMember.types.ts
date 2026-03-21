import type { ImageWithAltType, SchemaType } from '@lib/types/types';

export interface TeamMemberSchemaType extends SchemaType {
  image: ImageWithAltType;
  nameAndLastName: string;
  jobTitle: string;
  hotel: string;
  location: string;
}
