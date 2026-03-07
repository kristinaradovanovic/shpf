import { NodeTypeUnion } from '@lib/types/types';
import { FooterSchemaType } from '@schemas/footer/footer.types';
import { HeaderSchemaType } from '@schemas/header/header.types';
import { Settings } from '@schemas/settings/settings.types';

export interface IndexPagePreviewProps {
  node?: NodeTypeUnion;
  header?: HeaderSchemaType;
  footer?: FooterSchemaType;
  settings?: Settings;
  params?: any;
  locale?: string;
}
