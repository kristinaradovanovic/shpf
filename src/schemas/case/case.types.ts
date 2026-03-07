import type { CtaLinkType, ImageWithAltAndTitleType, SchemaType } from '@lib/types/types';
import { ExpertiseSchemaType } from '@schemas/expertise/expertise.types';
import { NodeSchemaType } from '@schemas/node/node.types';
import { FileAsset } from 'sanity';

export type CaseSchemaType = SchemaType & {
  node: NodeSchemaType;
  heroTitle: string;
  heroMediaType: 'image' | 'video';
  image: ImageWithAltAndTitleType;
  video: FileAsset;
  expertises: ExpertiseSchemaType[];
  ctaLinkFields: CtaLinkType;
  credits: string;
};
