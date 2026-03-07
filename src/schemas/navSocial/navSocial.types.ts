import type { ArrayMemberType, SchemaType } from '@lib/types/types';
import { ExternalLinkSchemaType } from '@schemas/externalLink/externalLink.types';
export interface NavSocialSchemaType extends SchemaType {
  navSocialsTitle: string;
  isTitleHidden?: boolean;
  socialLinkItems: (ArrayMemberType & ExternalLinkSchemaType)[];
}
