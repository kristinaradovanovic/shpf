import Button from '@/components/shared/elements/Button/Button';
import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { urlForImage } from '@lib/sanity/sanity.image';
import { h2 } from '@lib/styles/fonts/typography.css';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { ContentItemSchemaType } from '@/schemas/contentItem/contentItem.types';
import {
  bodyGridItem,
  bodyGridItemReversed,
  contentWrap,
  ctaWrap,
  descriptionText,
  headingGridItem,
  headingGridItemReversed,
  headingWrap,
  imageGridItem,
  imageGridItemReversed,
  imageStyle,
  splitContentCardGrid,
} from './SplitContentCard.css';
import { Grid } from '../../layout/Grid/Grid';
import { GridItem } from '../../layout/GridItem/GridItem';

type SplitContentCardProps = ContentItemSchemaType & {
  index: number;
};

const SplitContentCard = ({
  sectionTagline,
  title,
  description,
  ctaButton,
  image,
  index,
}: SplitContentCardProps) => {
  const isImageLeft = index % 2 === 1;
  const imageUrl = image?.asset ? urlForImage(image.asset, 75).url() : '';

  return (
    <Grid className={splitContentCardGrid}>
      <GridItem className={clsx(headingGridItem, isImageLeft && headingGridItemReversed)}>
        <div className={contentWrap}>
          <div className={headingWrap}>
            {sectionTagline && <SectionTagline text={sectionTagline} />}
            <CustomHeading
              as="h2"
              text={title}
              textColor="navy700"
              className={h2}
            />
          </div>
        </div>
      </GridItem>

      <GridItem className={clsx(imageGridItem, isImageLeft && imageGridItemReversed)}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={image?.alt || title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={imageStyle}
          />
        )}
      </GridItem>

      <GridItem className={clsx(bodyGridItem, isImageLeft && bodyGridItemReversed)}>
        <div className={contentWrap}>
          <p className={descriptionText}>{description}</p>
          {ctaButton && (
            <div className={ctaWrap}>
              <Button
                ctaButton={ctaButton}
                variant="navy"
                iconRight
              />
            </div>
          )}
        </div>
      </GridItem>
    </Grid>
  );
};

export default SplitContentCard;
