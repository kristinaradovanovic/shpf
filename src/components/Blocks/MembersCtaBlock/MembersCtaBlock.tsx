import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { h2 } from '@/lib/styles/fonts/typography.css';
import { MembersCtaBlockSchemaType } from '@/schemas/blocks/MembersCtaBlock/MembersCtaBlock.types';
import React from 'react';
import {
  buttonWrapperStyle,
  cardsItemStyle,
  descriptionStyle,
  headingItemStyle,
  headlineWrapperStyle,
  sectionGridStyle,
  sectionStyle,
} from './MembersCtaBlock.css';
import MemberCard from '@/components/shared/ui/MemberCard/MemberCard';
import Button from '@/components/shared/elements/Button/Button';

const MembersCtaBlock = ({
  sectionTagline,
  title,
  description,
  teamMembers,
  ctaButton,
}: MembersCtaBlockSchemaType) => {
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
              textColor="navy700"
              className={h2}
            />
            <p className={descriptionStyle}>{description}</p>
          </div>
        </GridItem>

        {teamMembers?.map((member) => (
          <GridItem
            key={member._id}
            className={cardsItemStyle}
          >
            <MemberCard {...member} />
          </GridItem>
        ))}

        <GridItem style={{ gridColumn: 'span 12' }}>
          <div className={buttonWrapperStyle}>
            <Button
              ctaButton={ctaButton}
              variant="navy"
              iconRight
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default MembersCtaBlock;
