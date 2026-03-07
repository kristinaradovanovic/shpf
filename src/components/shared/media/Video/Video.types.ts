export interface VideoProps {
  css?: any;
  assetId: string;
  width?: number;
  height?: number;
  preload?: 'none' | 'metadata' | 'auto';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
}
