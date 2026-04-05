import { responsiveStyles } from '@lib/styles/csshelpers';
import { bodyCopy, h2, h5, labelText } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const footerRoot = style([
  {
    backgroundColor: colors.navy900,
    backgroundImage:
      'radial-gradient(900px 360px at 95% 0%, rgba(36, 67, 108, 0.35), transparent 60%)',
    color: colors.white,
    paddingInline: spacings[16],
    paddingBlockStart: spacings[60],
    paddingBlockEnd: spacings[24],
    borderTop: `1px solid ${colors.gold500}99`,
  },
  responsiveStyles({
    tablet: {
      paddingInline: spacings[24],
      paddingBlockStart: spacings[70],
      paddingBlockEnd: spacings[32],
    },
    desktop: {
      paddingInline: spacings[80],
      paddingBlockStart: spacings[80],
      paddingBlockEnd: spacings[40],
    },
  }),
]);

export const topGrid = style([
  {
    maxWidth: '1440px',
    marginInline: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: spacings[32],
    paddingBlockEnd: spacings[40],
    alignItems: 'start',
  },
  responsiveStyles({
    tablet: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: spacings[32],
    },
    desktop: {
      gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.3fr) minmax(0, 1fr)',
      gap: spacings[40],
      paddingBlockEnd: spacings[48],
    },
  }),
]);

export const brandPanel = style({
  paddingTop: spacings[6],
});

export const logoWrap = style([
  {
    position: 'relative',
    width: '260px',
    height: '74px',
    marginBottom: spacings[24],
  },
  responsiveStyles({
    desktop: {
      width: '300px',
      height: '86px',
    },
  }),
]);

export const brandTitle = style([
  h2,
  {
    color: colors.white,
    margin: 0,
  },
]);

export const brandDescription = style([
  bodyCopy,
  {
    color: colors.slate300,
    marginTop: spacings[16],
    marginBottom: 0,
    maxWidth: '42ch',
  },
]);

export const sectionTitle = style([
  h5,
  {
    color: colors.gold400,
    margin: 0,
    marginBottom: spacings[16],
  },
]);

export const navColumnList = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: spacings[16],
    maxWidth: '420px',
  },
]);

export const navColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacings[8],
  paddingBlockEnd: spacings[16],
  borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
});

export const navColumnTitle = style([
  bodyCopy,
  {
    color: colors.white,
    textDecoration: 'none',
    fontWeight: 600,
    margin: 0,
    transition: 'color 180ms ease',
    selectors: {
      '&:hover': {
        color: colors.gold400,
      },
    },
  },
]);

export const navLink = style([
  bodyCopy,
  {
    color: colors.slate300,
    textDecoration: 'none',
    lineHeight: 1.5,
    transition: 'color 180ms ease',
    selectors: {
      '&:hover': {
        color: colors.white,
      },
    },
  },
]);

export const contactLabel = style([
  labelText,
  {
    color: colors.slate400,
  },
]);

export const contactValue = style([
  bodyCopy,
  {
    color: colors.slate300,
    margin: 0,
  },
]);

export const mutedText = style([
  bodyCopy,
  {
    color: colors.slate400,
    margin: 0,
  },
]);

export const legalRow = style([
  {
    maxWidth: '1440px',
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacings[16],
    paddingTop: spacings[20],
    borderTop: `1px solid rgba(255, 255, 255, 0.14)`,
  },
  responsiveStyles({
    tablet: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
]);

export const legalLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacings[16],
});

export const socialLinksWrap = style({
  paddingBlockStart: spacings[20],
});

export const legalLink = style([
  bodyCopy,
  {
    color: colors.slate300,
    textDecoration: 'none',
    transition: 'color 180ms ease',
    selectors: {
      '&:hover': {
        color: colors.gold400,
      },
    },
  },
]);
