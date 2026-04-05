import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import HighlightCard from '@/components/shared/ui/HighlightCard/HighlightCard';
import { h2 } from '@/lib/styles/fonts/typography.css';
import { PillarsGridBlockSchemaType } from '@/schemas/blocks/PillarsGridBlock/PillarsGridBlock.types';
import React from 'react';
import {
  cardItemStyle,
  descriptionStyle,
  headingItemStyle,
  headlineWrapperStyle,
  sectionGridStyle,
  sectionStyle,
} from './PillarsGridBlock.css';

const PillarsGridBlock = ({
  sectionTagline,
  title,
  description,
  highlightCards,
}: PillarsGridBlockSchemaType) => {
  const cardCountVariant = highlightCards?.length === 3 ? 'three' : 'four';

  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem className={headingItemStyle}>
          <div className={headlineWrapperStyle}>
            {sectionTagline && <SectionTagline text={sectionTagline} />}
            <CustomHeading
              as="h3"
              text={title}
              textColor="navy700"
              className={h2}
            />
            {description && <p className={descriptionStyle}>{description}</p>}
          </div>
        </GridItem>

        {highlightCards?.map((card) => (
          <GridItem
            key={card._key}
            className={cardItemStyle({ cardCount: cardCountVariant })}
          >
            <HighlightCard {...card} />
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
};

export default PillarsGridBlock;
