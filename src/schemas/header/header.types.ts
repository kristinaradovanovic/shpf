import { ButtonColorTypes } from '@lib/styles/variables/colors';
import type { ArrayMemberType, LocalizedSchemaType, SchemaType } from '@lib/types/types';
import { HeaderItemSchemaType } from '@schemas/headerItem/headerItem.types';
import { NavSocialSchemaType } from '@schemas/navSocial/navSocial.types';

export interface HeaderSchemaType extends SchemaType, LocalizedSchemaType {
  navSocials?: NavSocialSchemaType;
  headerItems?: (HeaderItemSchemaType & ArrayMemberType)[];
  ctaButtonText?: string;
  buttonColor?: ButtonColorTypes;
}
