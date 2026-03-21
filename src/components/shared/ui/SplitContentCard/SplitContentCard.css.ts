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
  responsiveStyles({
    tablet: {
      gridTemplateRows: 'auto auto',
    },
  }),
]);

export const headingGridItem = style([
  {
    gridColumn: 'span 12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveStyles({
    tablet: {
      gridColumn: 'span 6',
      gridRow: '1',
      paddingInlineEnd: spacings[30],
    },
  }),
]);

export const headingGridItemReversed = style([
  responsiveStyles({
    tablet: {
      gridColumn: '7 / span 6',
      paddingInlineStart: spacings[30],
      paddingInlineEnd: 0,
    },
  }),
]);

export const bodyGridItem = style([
  {
    gridColumn: 'span 12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacings[16],
  },
  responsiveStyles({
    tablet: {
      gridColumn: 'span 6',
      gridRow: '2',
      paddingInlineEnd: spacings[30],
      paddingTop: 0,
    },
  }),
]);

export const bodyGridItemReversed = style([
  responsiveStyles({
    tablet: {
      gridColumn: '7 / span 6',
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
    whiteSpace: 'pre-wrap',
  },
]);

export const ctaWrap = style([
  {
    marginTop: spacings[8],
    alignSelf: 'flex-end',
  },
  responsiveStyles({
    tablet: {
      alignSelf: 'flex-start',
    },
  }),
]);

export const imageGridItem = style([
  {
    gridColumn: 'span 12',
    position: 'relative',
    minHeight: '300px',
  },
  responsiveStyles({
    tablet: {
      gridColumn: 'span 6',
      gridRow: '1 / span 2',
      minHeight: '100%',
    },
  }),
]);

export const imageGridItemReversed = style([
  responsiveStyles({
    tablet: {
      gridColumn: '1 / span 6',
    },
  }),
]);

export const imageStyle = style({
  objectFit: 'cover',
});
