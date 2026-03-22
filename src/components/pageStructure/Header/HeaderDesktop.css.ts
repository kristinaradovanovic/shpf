import { responsiveStyles } from '@lib/styles/csshelpers';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

// Only visible on desktop (>= 1024px)
export const wrapper = style([
  { display: 'none' },
  responsiveStyles({
    desktop: { display: 'block' },
  }),
]);

export const topRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  paddingBlock: spacings[16],
  columnGap: spacings[20],
  borderBottom: `1px solid ${colors.gold400}55`,
  transition: 'padding-block 220ms ease',
});

export const topRowCompact = style({
  paddingBlock: '7px',
});

export const logoLink = style({
  justifySelf: 'start',
  textDecoration: 'none',
});

export const logoBadgeWrap = style({
  position: 'relative',
  width: spacings[60],
  height: spacings[60],
  borderRadius: '999px',
  border: `1px solid ${colors.gold500}`,
  backgroundColor: colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 10px rgba(11, 28, 51, 0.08)',
  transition: 'box-shadow 220ms ease, transform 220ms ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 18px rgba(11, 28, 51, 0.12)',
    },
  },
});

export const logoImage = style({
  objectFit: 'contain',
  padding: spacings[8],
});

export const siteTitle = style({
  justifySelf: 'center',
  fontFamily: 'var(--accent-font)',
  fontSize: '28px',
  lineHeight: 1.1,
  letterSpacing: '0.02em',
  color: colors.navy700,
  textAlign: 'center',
  textTransform: 'none',
  transition: 'font-size 220ms ease',
});

export const siteTitleCompact = style({
  fontSize: '24px',
});

export const rightControls = style({
  justifySelf: 'end',
  display: 'flex',
  alignItems: 'center',
  gap: spacings[16],
});

export const languageSwitch = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacings[8],
});

export const langLink = style({
  color: colors.slate500,
  textDecoration: 'none',
  fontFamily: 'var(--base-font)',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transition: 'color 180ms ease',
  selectors: {
    '&:hover': {
      color: colors.navy700,
    },
  },
});

export const langLinkActive = style({
  color: colors.navy700,
  fontWeight: 600,
});

export const langDivider = style({
  color: colors.slate400,
  userSelect: 'none',
});

export const ctaButtonWrapper = style({
  display: 'inline-flex',
});

// Bottom nav row — collapses when compact
// maxHeight + opacity are driven by inline style in the component for reliable animation
export const bottomRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'max-height 280ms ease, opacity 200ms ease',
});

export const nav = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingBlock: spacings[12],
});

export const navList = style({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacings[32],
  margin: 0,
  padding: 0,
});

export const navLink = style({
  fontFamily: 'var(--base-font)',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: colors.navy700,
  textDecoration: 'none',
  transition: 'color 180ms ease',
  selectors: {
    '&:hover': {
      color: colors.gold500,
    },
  },
});
