import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { SplitContentBlockSchemaType } from '@/schemas/blocks/SplitContentBlock/SplitContentBlock.types';
import React from 'react';
import Image from 'next/image';
import { urlForImage } from '@lib/sanity/sanity.image';
import {
  descriptionStyle,
  gridItemStyle,
  headlineWrapperStyle,
  sectionGridStyle,
  sectionStyle,
} from './SplitContentBlock.css';
import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { h2 } from '@/lib/styles/fonts/typography.css';

const SplitContentBlock = ({
  sectionTagline,
  title,
  description,
  image,
}: SplitContentBlockSchemaType) => {
  const imageUrl = image?.asset ? urlForImage(image.asset, 75).url() : '';

  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem className={gridItemStyle}>
          {sectionTagline && (
            <SectionTagline
              text={sectionTagline}
              alignment="left"
            />
          )}
          <div className={headlineWrapperStyle}>
            <CustomHeading
              as="h3"
              text={title}
              textColor="navy700"
              className={h2}
            />
            <p className={descriptionStyle}>{description}</p>
          </div>
        </GridItem>
        <GridItem className={gridItemStyle}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={image?.alt || title}
              width={400}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </GridItem>
      </Grid>
    </Section>
  );
};

export default SplitContentBlock;
