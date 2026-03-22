'use client';

import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { PartnersCtaBlockSchemaType } from '@/schemas/blocks/PartnersCtaBlock/PartnersCtaBlock.types';
import Image from 'next/image';
import React, { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  buttonWrapperStyle,
  descriptionStyle,
  headingItemStyle,
  headlineWrapperStyle,
  partnerCardImageStyle,
  partnerCardImageWrapperStyle,
  partnerCardStyle,
  partnerNameStyle,
  sectionStyle,
  sliderGridItemStyle,
  sliderStyle,
} from './PartnersCtaBlock.css';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { h2 } from '@/lib/styles/fonts/typography.css';
import Button from '@/components/shared/elements/Button/Button';

const PartnersCtaBlock = ({
  sectionTagline,
  title,
  description,
  partners,
  ctaButton,
}: PartnersCtaBlockSchemaType) => {
  const autoplayResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoplay = (swiper: SwiperType) => {
    if (autoplayResumeTimer.current) {
      clearTimeout(autoplayResumeTimer.current);
    }
    swiper.autoplay.stop();
  };

  const resumeAutoplayAfterDelay = (swiper: SwiperType) => {
    if (autoplayResumeTimer.current) {
      clearTimeout(autoplayResumeTimer.current);
    }

    autoplayResumeTimer.current = setTimeout(() => {
      swiper.autoplay.start();
    }, 2500);
  };

  return (
    <Section className={sectionStyle}>
      <Grid>
        <GridItem style={{ gridColumn: 'span 12' }}>
          {sectionTagline && <SectionTagline text={sectionTagline} />}
        </GridItem>

        <GridItem className={headingItemStyle}>
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

        <GridItem className={sliderGridItemStyle}>
          <Swiper
            className={sliderStyle}
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={16}
            loop
            speed={5000}
            allowTouchMove
            grabCursor
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onTouchStart={pauseAutoplay}
            onTouchEnd={resumeAutoplayAfterDelay}
            onSliderFirstMove={pauseAutoplay}
          >
            {partners?.map((partner) => {
              const imageUrl = partner?.image?.asset
                ? urlForImage(partner.image.asset, 75).url()
                : null;

              return (
                <SwiperSlide key={partner._id || partner.partnerName}>
                  <article className={partnerCardStyle}>
                    <div className={partnerCardImageWrapperStyle}>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={partner?.image?.alt || partner.partnerName}
                          fill
                          className={partnerCardImageStyle}
                          sizes="(max-width: 768px) 120px, 140px"
                        />
                      ) : null}
                    </div>
                    <p className={partnerNameStyle}>{partner.partnerName}</p>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </GridItem>

        <GridItem style={{ gridColumn: 'span 12', paddingBlockStart: '20px' }}>
          <div className={buttonWrapperStyle}>
            <Button
              ctaButton={ctaButton}
              variant="navyOutlined"
              iconRight
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default PartnersCtaBlock;
