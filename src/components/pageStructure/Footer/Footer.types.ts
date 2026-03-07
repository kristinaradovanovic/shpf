import { FooterSchemaType } from '@schemas/footer/footer.types';
import { Settings } from '@schemas/settings/settings.types';

export interface FooterProps {
  footer: FooterSchemaType;
  showFooter: boolean;
  settings: Settings;
}
