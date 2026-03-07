/* eslint-disable @next/next/no-img-element */

export function ImagePreviewComponent({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      style={{ objectFit: 'cover' }}
    />
  );
}
