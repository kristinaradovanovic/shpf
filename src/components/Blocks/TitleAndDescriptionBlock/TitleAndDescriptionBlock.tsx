import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { TitleAndDescriptionBlockSchemaType } from '@/schemas/blocks/TitleAndDescriptionBlock/TitleAndDescriptionBlock.types';
import React from 'react';
import {
  contentWrapperStyle,
  descriptionStyle,
  gridItemStyle,
  sectionGridStyle,
  sectionStyle,
  titleStyle,
} from './TitleAndDescriptionBlock.css';

const TitleAndDescriptionBlock = ({
  sectionTagline,
  title,
  description,
}: TitleAndDescriptionBlockSchemaType) => {
  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem className={gridItemStyle}>
          <div className={contentWrapperStyle}>
            {sectionTagline && (
              <SectionTagline
                text={sectionTagline}
                alignment="center"
              />
            )}
            <CustomHeading
              as="h3"
              text={title}
              textColor="navy700"
              className={titleStyle}
            />
            <p className={descriptionStyle}>{description}</p>
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default TitleAndDescriptionBlock;
