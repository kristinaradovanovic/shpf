import { SectionTagline } from '@/components/shared/elements/SectionTagline/SectionTagline';
import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { h2 } from '@/lib/styles/fonts/typography.css';
import {
  RichTextBlockLinkMark,
  RichTextBlockSchemaType,
} from '@/schemas/blocks/RichTextBlock/RichTextBlock.types';
import { PortableText } from '@portabletext/react';
import React from 'react';
import {
  contentWrapperStyle,
  gridItemStyle,
  richTextStyle,
  sectionGridStyle,
  sectionStyle,
} from './RichTextBlock.css';

const RichTextBlock = ({
  sectionTagline,
  title,
  positioning = 'left',
  richTextContent,
}: RichTextBlockSchemaType) => {
  const isCenterPositioned = positioning === 'center';
  const textAlignment = isCenterPositioned ? 'center' : 'left';

  return (
    <Section className={sectionStyle}>
      <Grid className={sectionGridStyle}>
        <GridItem className={gridItemStyle}>
          <div className={contentWrapperStyle}>
            {sectionTagline && (
              <SectionTagline
                text={sectionTagline}
                alignment={textAlignment}
              />
            )}
            {title && (
              <CustomHeading
                as="h3"
                text={title}
                textColor="navy700"
                className={h2}
                style={isCenterPositioned ? { textAlign: 'center' } : undefined}
              />
            )}
          </div>
        </GridItem>
        <GridItem className={gridItemStyle}>
          <div className={richTextStyle({ alignment: positioning })}>
            <PortableText
              value={richTextContent || []}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                },
                marks: {
                  link: ({ value, children }) => {
                    const linkValue = value as RichTextBlockLinkMark;
                    const href =
                      linkValue?.linkType === 'mail'
                        ? `mailto:${linkValue?.emailAddress || ''}`
                        : linkValue?.url || '#';
                    return (
                      <a
                        href={href}
                        target={linkValue?.linkType === 'external' ? '_blank' : undefined}
                        rel={linkValue?.linkType === 'external' ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default RichTextBlock;
