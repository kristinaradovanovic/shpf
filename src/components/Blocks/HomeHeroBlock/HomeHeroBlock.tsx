import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import Button from '@/components/shared/elements/Button/Button';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { HomeHeroBlockSchemaType } from '@/schemas/blocks/HomeHeroBlock/HomeHeroBlock.types';
import { urlForImage } from '@lib/sanity/sanity.image';
import Image from 'next/image';
import React from 'react';
import {
  backgroundImageStyle,
  backgroundOverlayStyle,
  buttonsRow,
  contentWrap,
  descriptionText,
  gridItemCenterStyle,
  headingStyle,
  homeHeroGridStyle,
  homeHeroSectionStyle,
} from './HomeHeroBlock.css';

const HomeHeroBlock = ({
  title,
  description,
  image,
  ctaButton,
  memberCtaButton,
}: HomeHeroBlockSchemaType) => {
  const imageUrl = image?.asset ? urlForImage(image.asset, 75).url() : '';
  const buttons = [ctaButton, memberCtaButton].filter(Boolean);

  return (
    <Section className={homeHeroSectionStyle}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={image?.alt || title}
          fill
          priority
          sizes="100vw"
          className={backgroundImageStyle}
        />
      )}
      <div className={backgroundOverlayStyle} />
      <Grid className={homeHeroGridStyle}>
        <GridItem className={gridItemCenterStyle}>
          <div className={contentWrap}>
            <CustomHeading
              as="h1"
              text={title}
              textColor="white"
              className={headingStyle}
            />
            <p className={descriptionText}>{description}</p>
            {buttons.length > 0 && (
              <div className={buttonsRow}>
                {buttons.map((button, index) => (
                  <Button
                    key={`${button?.ctaTitle || 'cta'}-${index}`}
                    ctaButton={button}
                    variant={index === 0 ? 'golden' : 'whiteOutlined'}
                  />
                ))}
              </div>
            )}
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default HomeHeroBlock;
