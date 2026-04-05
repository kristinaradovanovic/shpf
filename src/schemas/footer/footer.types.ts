import type {
  ArrayMemberType,
  ImageWithAltType,
  LocalizedSchemaType,
  SchemaType,
} from '@lib/types/types';
import { ContactDetailsSchemaType } from '@schemas/contactDetails/contactDetails.types';
import { FooterItemSchemaType } from '@schemas/footerItem/footerItem.types';
import { NavItemSchemaType } from '@schemas/navItem/navItem.types';
import { NavSocialSchemaType } from '@schemas/navSocial/navSocial.types';

export interface FooterSchemaType extends SchemaType, LocalizedSchemaType {
  contactDetails?: ContactDetailsSchemaType;
  navSocials?: NavSocialSchemaType;
  footerItemsTitle?: string;
  footerItems?: (FooterItemSchemaType & ArrayMemberType)[];
  copyright?: string;
  policies?: NavItemSchemaType;
  title?: string;
  description?: string;
  image?: ImageWithAltType;
}
