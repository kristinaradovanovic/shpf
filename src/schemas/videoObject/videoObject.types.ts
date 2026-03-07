import { FileAsset } from 'sanity';

export type VideoObjectSchemaType = {
  title: string;
  description: string;
  videoType: 'video' | 'embeddedVideoUrl';
  video?: FileAsset;
  embeddedVideoUrl?: string;
};
