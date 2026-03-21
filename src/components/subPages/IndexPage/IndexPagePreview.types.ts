import { NodeTypeUnion } from '@lib/types/types';
import { FooterSchemaType } from '@schemas/footer/footer.types';
import { HeaderSchemaType } from '@schemas/header/header.types';

export interface IndexPagePreviewProps {
  node?: NodeTypeUnion;
  header?: HeaderSchemaType;
  footer?: FooterSchemaType;
  params?: any;
  locale?: string;
}
