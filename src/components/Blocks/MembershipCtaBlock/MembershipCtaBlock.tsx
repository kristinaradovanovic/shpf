import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import HighlightCard from '@/components/shared/ui/HighlightCard/HighlightCard';
import { h2 } from '@/lib/styles/fonts/typography.css';
import { MembershipCtaBlockSchemaType } from '@/schemas/blocks/MembershipCtaBlock/MembershipCtaBlock.types';
import React from 'react';
import {
  buttonWrapperStyle,
  cardItemStyle,
  descriptionStyle,
  headingItemStyle,
  headlineWrapperStyle,
  sectionGridStyle,
  sectionStyle,
} from './MembershipCtaBlock.css';
import Button from '@/components/shared/elements/Button/Button';

const MembershipCtaBlock = ({
  sectionTagline,
  title,
  description,
  highlightCards,
  ctaButton,
}: MembershipCtaBlockSchemaType) => {
  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem style={{ gridColumn: 'span 12' }}>
          {sectionTagline && <SectionTagline text={sectionTagline} />}
        </GridItem>

        <GridItem className={headingItemStyle}>
          <div className={headlineWrapperStyle}>
            <CustomHeading
              as="h3"
              text={title}
              textColor="white"
              className={h2}
            />
            <p className={descriptionStyle}>{description}</p>
          </div>
        </GridItem>

        {highlightCards?.map((card) => (
          <GridItem
            key={card._key}
            className={cardItemStyle}
          >
            <HighlightCard {...card} />
          </GridItem>
        ))}

        <GridItem style={{ gridColumn: 'span 12', paddingBlockStart: '20px' }}>
          <div className={buttonWrapperStyle}>
            <Button
              ctaButton={ctaButton}
              variant="golden"
              iconRight
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default MembershipCtaBlock;
