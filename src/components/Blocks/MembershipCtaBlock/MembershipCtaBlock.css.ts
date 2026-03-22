import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[80],
    backgroundColor: colors.blue800,
  },
  responsiveStyles({
    tablet: {
      paddingBlockStart: spacings[40],
      paddingBlockEnd: spacings[80],
    },
  }),
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
    paddingBlockStart: spacings[48],
    paddingBlockEnd: spacings[48],
  },
]);

export const cardItemStyle = style([
  {
    gridColumn: 'span 12',
  },
  responsiveStyles({
    tablet: {
      gridColumn: 'span 6',
    },
    desktop: {
      gridColumn: 'span 3',
    },
  }),
]);

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
    color: colors.white,
    maxWidth: '600px',
    alignSelf: 'center',
  },
]);

export const buttonWrapperStyle = style([
  {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBlockStart: spacings[20],
  },
  responsiveStyles({
    tablet: {
      justifyContent: 'center',
      paddingBlockStart: spacings[40],
    },
  }),
]);
