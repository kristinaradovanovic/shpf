import Button from '@/components/shared/elements/Button/Button';
import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { SanityImage } from '@/components/shared/media/SanityImage/SanityImage';
import { h2 } from '@lib/styles/fonts/typography.css';
import clsx from 'clsx';
import React from 'react';
import { ContentItemSchemaType } from '@/schemas/contentItem/contentItem.types';
import {
  contentGridItem,
  contentGridItemReversed,
  contentWrap,
  ctaWrap,
  descriptionText,
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

  return (
    <Grid className={splitContentCardGrid}>
      <GridItem className={clsx(contentGridItem, isImageLeft && contentGridItemReversed)}>
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

      <div className={clsx(imageGridItem, isImageLeft && imageGridItemReversed)}>
        {image?.asset && (
          <SanityImage
            assetRef={image.asset}
            alt={image.alt || title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            css={imageStyle}
          />
        )}
      </div>
    </Grid>
  );
};

export default SplitContentCard;
