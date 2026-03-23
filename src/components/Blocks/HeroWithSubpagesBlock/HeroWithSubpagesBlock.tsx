import { Grid } from '@/components/shared/layout/Grid/Grid';
import { GridItem } from '@/components/shared/layout/GridItem/GridItem';
import { Section } from '@/components/shared/layout/Section/Section';
import Button from '@/components/shared/elements/Button/Button';
import { CustomHeading } from '@/components/shared/ui/CustomHeading/CustomHeading';
import { urlForImage } from '@lib/sanity/sanity.image';
import type { FilterPageSchemaType } from '@schemas/filterPage/filterPage.types';
import Image from 'next/image';
import Link from 'next/link';
import {
  backgroundImageStyle,
  backgroundOverlayStyle,
  buttonItem,
  buttonsRow,
  contentWrap,
  descriptionText,
  gridItemCenterStyle,
  headingStyle,
  heroWithSubPagesGridStyle,
  heroWithSubPagesSectionStyle,
} from './HeroWithSubpagesBlock.css';

type HeroWithSubpagesType = {
  title?: string;
  description?: string;
};

type HeroWithSubpagesBlockProps = {
  hero?: HeroWithSubpagesType;
  tabs: FilterPageSchemaType[];
  activeFilterPage?: FilterPageSchemaType;
  activeSlug?: string;
  basePath: string;
};

export default function HeroWithSubpagesBlock({
  hero,
  tabs,
  activeFilterPage,
  activeSlug,
  basePath,
}: HeroWithSubpagesBlockProps) {
  const imageUrl = activeFilterPage?.image?.asset
    ? urlForImage(activeFilterPage.image.asset, 75).url()
    : '';

  return (
    <Section className={heroWithSubPagesSectionStyle}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={
            activeFilterPage?.image?.alt || activeFilterPage?.title || hero?.title || 'Hero image'
          }
          fill
          priority
          sizes="100vw"
          className={backgroundImageStyle}
        />
      )}
      <div className={backgroundOverlayStyle} />
      <Grid className={heroWithSubPagesGridStyle}>
        <GridItem className={gridItemCenterStyle}>
          <div className={contentWrap}>
            {hero?.title && (
              <CustomHeading
                as="h1"
                text={hero.title}
                textColor="white"
                className={headingStyle}
              />
            )}
            {hero?.description && <p className={descriptionText}>{hero.description}</p>}
          </div>
        </GridItem>

        <GridItem className={buttonItem}>
          {tabs.length > 0 && (
            <div className={buttonsRow}>
              {tabs.map((tab) => {
                const isActive = tab.slug === activeSlug;
                const href = `${basePath}?page=${tab.slug}`;

                return (
                  <Link
                    key={tab._id}
                    href={href}
                  >
                    <Button
                      text={tab.tabLabel || tab.title}
                      variant="whiteOutlined"
                      isActive={isActive}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </GridItem>
      </Grid>
    </Section>
  );
}
