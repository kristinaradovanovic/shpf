import { Image, ImageAsset } from 'sanity';

export interface SanityImageProps {
  style?: any;
  css?: any;
  assetRef: string | Image | { asset: ImageAsset; alt: string; crop?: any; hotspot?: any };
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  onError?: () => void;
}
