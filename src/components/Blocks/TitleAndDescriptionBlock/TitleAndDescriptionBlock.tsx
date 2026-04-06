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
  positioning = 'center',
}: TitleAndDescriptionBlockSchemaType) => {
  const textAlignment = positioning === 'center' ? 'center' : 'left';

  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem className={gridItemStyle({ alignment: positioning })}>
          <div className={contentWrapperStyle({ alignment: positioning })}>
            {sectionTagline && (
              <SectionTagline
                text={sectionTagline}
                alignment={textAlignment}
              />
            )}
            <CustomHeading
              as="h3"
              text={title}
              textColor="navy700"
              className={titleStyle({ alignment: positioning })}
            />
            <p className={descriptionStyle({ alignment: positioning })}>{description}</p>
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default TitleAndDescriptionBlock;
