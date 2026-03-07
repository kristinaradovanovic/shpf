import type { SchemaType } from '@lib/types/types';
import { FileAsset } from 'sanity';

export interface Settings extends SchemaType {
  title: string;
  iconDark?: FileAsset;
  iconLight?: FileAsset;
  gtmID?: string;
  gtmDataLayerName?: string;
  gaID?: string;
  gaDataLayerName?: string;
  defaultOgImage?: FileAsset;
  defaultOgImageAlt?: string;
}
