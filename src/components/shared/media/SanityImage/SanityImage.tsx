import { urlForImage } from '@lib/sanity/sanity.image';
import Image from 'next/image';
// import { useNextSanityImage } from 'next-sanity-image';
// import { getSanityImageConfig } from '@lib/sanity/sanity.client';

import { SanityImageProps } from './SanityImage.types';

export const SanityImage = ({
  style,
  css,
  assetRef,
  alt,
  priority = false,
  width,
  height,
  sizes = '',
  fill = false,
  quality = 35,
  onError,
}: SanityImageProps) => {
  // const imageProps = useNextSanityImage(getSanityImageConfig(), assetRef);
  // if (!imageProps) return null;

  return (
    <Image
      className={css}
      style={style}
      width={width}
      height={height}
      alt={alt}
      fill={fill}
      src={urlForImage(assetRef, quality).url()}
      sizes={sizes || '100vw'}
      priority={priority}
      quality={quality}
      onError={onError}
    />
  );
};
