import type { ImageWithAltType, LocalizedSchemaType, SchemaType } from '@lib/types/types';
import type { FilterPageSchemaType } from '@schemas/filterPage/filterPage.types';
import type { NodeSchemaType } from '@schemas/node/node.types';

export interface PageSchemaType extends SchemaType, LocalizedSchemaType {
  isRoot: boolean;
  node: NodeSchemaType;
  image?: ImageWithAltType;
  isIndex: boolean;
  pageType?: 'default' | 'filter';
  heroWithSubpages?: {
    title?: string;
    description?: string;
  };
  filterPages?: FilterPageSchemaType[];
  defaultFilterPage?: FilterPageSchemaType;
  blocks?: any[];
}
