import Image from 'next/image';
import React from 'react';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { ImageBlockSchemaType } from '@/schemas/blocks/ImageBlock/ImageBlock.types';
import {
  gridItemStyle,
  imageContainerStyle,
  imageStyle,
  sectionGridStyle,
  sectionStyle,
} from './ImageBlock.css';

const ImageBlock = ({ images }: ImageBlockSchemaType) => {
  const imageCount = images.length;
  const sharedHalfWidthAspectRatio = '3 / 2';

  const getAspectRatio = (imageItem: ImageBlockSchemaType['images'][number]) => {
    if (imageCount === 2) {
      return sharedHalfWidthAspectRatio;
    }

    const asset = imageItem.image?.asset as
      | {
          metadata?: {
            dimensions?: {
              width?: number;
              height?: number;
            };
          };
        }
      | undefined;

    const width = asset?.metadata?.dimensions?.width;
    const height = asset?.metadata?.dimensions?.height;

    return width && height ? `${width} / ${height}` : '16 / 9';
  };

  const getGridSpan = (): 'span-12' | 'span-6' => {
    return imageCount === 2 ? 'span-6' : 'span-12';
  };

  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        {images.map((imageItem) => {
          const imageUrl = (imageItem.image?.asset as { url?: string } | undefined)?.url || '';
          const aspectRatio = getAspectRatio(imageItem);
          const objectPosition = `${imageItem.horizontalAlignment || 'center'} ${
            imageItem.verticalAlignment || 'center'
          }`;

          return (
            <GridItem
              key={imageItem._key}
              className={gridItemStyle({ span: getGridSpan() })}
            >
              {imageUrl && (
                <div
                  className={imageContainerStyle}
                  style={{ aspectRatio }}
                >
                  <Image
                    src={imageUrl}
                    alt={imageItem.image.alt || ''}
                    fill
                    className={imageStyle}
                    style={{ objectPosition }}
                    sizes={imageCount === 1 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  />
                </div>
              )}
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  );
};

export default ImageBlock;
