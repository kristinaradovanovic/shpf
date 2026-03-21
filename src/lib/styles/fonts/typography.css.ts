import { style } from '@vanilla-extract/css';
import { fontSizes } from '../variables/fonts';
import { responsiveStyles } from '../csshelpers';

export const h1 = style([
  {
    fontFamily: 'var(--accent-font)',
    fontWeight: 600,
    fontSize: fontSizes[60],
    lineHeight: '1.05',
    letterSpacing: '-0.04em',
  },
  responsiveStyles({
    desktop: {
      fontSize: fontSizes[80],
    },
  }),
]);

export const h2 = style([
  {
    fontFamily: 'var(--accent-font)',
    fontWeight: 600,
    fontSize: fontSizes[32],
    lineHeight: '1.2',
    letterSpacing: '-0.03em',
  },
  responsiveStyles({
    desktop: {
      fontSize: fontSizes[40],
    },
  }),
]);

export const h4 = style([
  {
    fontFamily: 'var(--accent-font)',
    fontWeight: 600,
    fontSize: fontSizes[22],
    lineHeight: '1.25',
    letterSpacing: '-0.02em',
  },
]);

export const h5 = style([
  {
    fontFamily: 'var(--accent-font)',
    fontWeight: 600,
    fontSize: fontSizes[18],
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
]);

export const bodyCopy = style([
  {
    fontFamily: 'var(--base-font)',
    fontWeight: 400,
    fontSize: fontSizes[16],
    lineHeight: '1.5',
    letterSpacing: '-0.01em',
  },
]);

export const headingDescription = style([
  {
    fontFamily: 'var(--accent-font)',
    fontWeight: 400,
    fontSize: fontSizes[24],
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
  responsiveStyles({
    desktop: {
      fontSize: fontSizes[28],
    },
  }),
]);

export const labelText = style({
  fontFamily: 'var(--base-font)',
  fontWeight: 600,
  fontSize: fontSizes[14],
  lineHeight: '1.2',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
});
