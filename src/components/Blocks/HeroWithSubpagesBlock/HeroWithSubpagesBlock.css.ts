import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@lib/styles/csshelpers';
import { h1, headingDescription } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const heroWithSubPagesSectionStyle = style({
  position: 'relative',
  overflow: 'hidden',
  minHeight: '75vh',
});

export const heroWithSubPagesGridStyle = style([
  gridStyle({ inlinePadding: 'none' }),
  {
    position: 'relative',
    minHeight: '75vh',
    width: '100%',
  },
  responsiveStyles({
    mobile: {
      minHeight: '75vh',
    },
    tablet: {
      minHeight: '75vh',
    },
    desktop: {
      minHeight: '75vh',
    },
  }),
]);

export const backgroundImageStyle = style({
  objectFit: 'cover',
  zIndex: 0,
});

export const backgroundOverlayStyle = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  background:
    'linear-gradient(90deg, rgba(10, 28, 51, 0.9) 0%, rgba(29, 46, 70, 0.85) 50%, rgba(24, 59, 104, 0.7) 100%)',
});

export const gridItemCenterStyle = style([
  {
    gridColumn: 'span 12',
    zIndex: 2,
    alignSelf: 'center',
    alignItems: 'center',
  },
]);

export const headingStyle = style([
  h1,
  {
    maxWidth: spacings[650],
    paddingBlockEnd: spacings[24],
  },
]);

export const contentWrap = style([
  {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacings[16],
    paddingInline: spacings[20],
    paddingBlock: spacings[70],
  },
  responsiveStyles({
    desktop: {
      gap: spacings[20],
      paddingBlock: spacings[100],
    },
  }),
]);

export const descriptionText = style([
  headingDescription,
  {
    color: colors.white,
    paddingBlockEnd: spacings[48],
  },
]);

export const buttonsRow = style([
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacings[12],
    marginTop: spacings[12],
  },
  responsiveStyles({
    desktop: {
      gap: spacings[16],
    },
  }),
]);

export const buttonItem = style({
  gridColumn: 'span 12',
  zIndex: 2,
  alignSelf: 'end',
});
