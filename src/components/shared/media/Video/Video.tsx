import { generateCDNAssetURL } from '@lib/utils/cdn-utils';
import { VideoProps } from './Video.types';

export const Video = ({
  css,
  assetId,
  width,
  height,
  preload,
  autoPlay = true,
  muted = true,
  loop = true,
  poster,
}: VideoProps) => {
  const videoSource = generateCDNAssetURL(assetId);

  if (!videoSource) return null;

  return (
    <video
      className={css}
      width={width}
      height={height}
      preload={preload}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      poster={poster || ''}
      playsInline
    >
      <source
        src={videoSource}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};
