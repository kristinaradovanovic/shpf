import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sectionStyle = style([
  {
    paddingBlock: spacings[80],
    background: colors.sand100,
  },
]);

export const sectionGridStyle = style([
  gridStyle(),
  {
    columnGap: spacings[20],
    rowGap: spacings[20],
  },
]);

export const headingItemStyle = style([
  {
    gridColumn: 'span 12',
    paddingBlockEnd: spacings[24],
  },
]);

export const cardItemStyle = recipe({
  base: [
    {
      gridColumn: 'span 12',
    },
    responsiveStyles({
      tablet: {
        gridColumn: 'span 6',
      },
    }),
  ],
  variants: {
    cardCount: {
      three: responsiveStyles({
        desktop: {
          gridColumn: 'span 4',
        },
      }),
      four: responsiveStyles({
        desktop: {
          gridColumn: 'span 3',
        },
      }),
    },
  },
  defaultVariants: {
    cardCount: 'four',
  },
});

export const headlineWrapperStyle = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacings[16],
    textAlign: 'center',
  },
]);

export const descriptionStyle = style([
  sectionDescription,
  {
    color: colors.slate500,
    maxWidth: '600px',
    alignSelf: 'center',
  },
]);
