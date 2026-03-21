import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@lib/styles/csshelpers';
import { bodyCopy } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const splitContentCardGrid = style([
  gridStyle({ inlinePadding: 'none' }),
  {
    alignItems: 'stretch',
    overflow: 'hidden',
  },
]);

export const contentGridItem = style([
  {
    gridColumn: 'span 12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveStyles({
    desktop: {
      gridColumn: 'span 6',
      order: 1,
      paddingInlineEnd: spacings[30],
    },
  }),
]);

export const contentGridItemReversed = style([
  responsiveStyles({
    desktop: {
      order: 2,
      paddingInlineStart: spacings[30],
      paddingInlineEnd: 0,
    },
  }),
]);

export const contentWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacings[16],
  width: '100%',
});

export const headingWrap = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacings[12],
    paddingBlockEnd: spacings[18],
  },
]);

export const descriptionText = style([
  bodyCopy,
  {
    color: colors.navy700,
    margin: 0,
    paddingBlockEnd: spacings[20],
  },
]);

export const ctaWrap = style({
  marginTop: spacings[8],
});

export const imageGridItem = style([
  {
    gridColumn: 'span 12',
    position: 'relative',
    minHeight: '300px',
  },
  responsiveStyles({
    desktop: {
      gridColumn: 'span 6',
      minHeight: '100%',
      order: 2,
    },
  }),
]);

export const imageGridItemReversed = style([
  responsiveStyles({
    desktop: {
      order: 1,
    },
  }),
]);

export const imageStyle = style({
  objectFit: 'cover',
});
