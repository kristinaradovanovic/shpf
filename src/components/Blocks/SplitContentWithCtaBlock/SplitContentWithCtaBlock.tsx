import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import SplitContentCard from '@/components/shared/ui/SplitContentCard/SplitContentCard';
import { SplitContentWithCtaBlockSchemaType } from '@/schemas/blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.types';
import React from 'react';
import { gridItemStyle, sectionStyle } from './SplitContentWithCtaBlock.css';

const SplitContentWithCtaBlock = ({ contentItems }: SplitContentWithCtaBlockSchemaType) => {
  if (!contentItems?.length) {
    return null;
  }

  return (
    <Section className={sectionStyle}>
      <Grid>
        {contentItems.map((item, index) => (
          <GridItem
            key={item._key || `${item.title}-${index}`}
            className={gridItemStyle}
          >
            <SplitContentCard
              {...item}
              index={index}
            />
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
};

export default SplitContentWithCtaBlock;
