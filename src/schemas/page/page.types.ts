import type { ImageWithAltType, LocalizedSchemaType, SchemaType } from '@lib/types/types';
import type { NodeSchemaType } from '@schemas/node/node.types';

export interface PageSchemaType extends SchemaType, LocalizedSchemaType {
  isRoot: boolean;
  node: NodeSchemaType;
  image?: ImageWithAltType;
  isIndex: boolean;
  blocks?: any[];
}
