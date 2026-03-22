import { responsiveStyles } from '@lib/styles/csshelpers';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const header = style({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 30,
  backgroundColor: colors.sand50,
  borderTop: `1px solid ${colors.gold500}`,
  borderBottom: `1px solid ${colors.gold500}`,
  boxShadow: '0 8px 24px rgba(17, 35, 60, 0.06)',
  transition: 'box-shadow 220ms ease, border-color 220ms ease',
});

export const headerCompact = style({
  boxShadow: '0 4px 14px rgba(17, 35, 60, 0.08)',
});

export const headerInner = style([
  {
    maxWidth: '1440px',
    marginInline: 'auto',
    paddingInline: spacings[24],
  },
  responsiveStyles({
    desktop: {
      paddingInline: spacings[80],
    },
  }),
]);

export const topRow = style([
  {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    minHeight: '92px',
    columnGap: spacings[20],
    borderBottom: `1px solid ${colors.gold400}55`,
    transition: 'min-height 220ms ease, border-color 220ms ease',
  },
  responsiveStyles({
    mobile: {
      gridTemplateColumns: 'auto 1fr auto',
      minHeight: '78px',
    },
    tablet: {
      gridTemplateColumns: '1fr auto 1fr',
      minHeight: '92px',
    },
  }),
]);

export const topRowCompact = style([
  {
    minHeight: '74px',
  },
  responsiveStyles({
    mobile: {
      minHeight: '66px',
    },
  }),
]);

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

export const logoBadgeWrapCompact = style({
  width: spacings[48],
  height: spacings[48],
});

export const logoBadge = style({
  fontFamily: 'var(--accent-font)',
  fontSize: '30px',
  lineHeight: 1,
  color: colors.navy700,
});

export const logoPoint = style({
  position: 'absolute',
  top: spacings[8],
  right: spacings[8],
  width: spacings[8],
  height: spacings[8],
  borderRadius: '999px',
  backgroundColor: colors.gold500,
  boxShadow: `0 0 0 2px ${colors.white}`,
});

export const siteTitle = style([
  {
    justifySelf: 'center',
    fontFamily: 'var(--accent-font)',
    fontSize: '28px',
    lineHeight: 1.1,
    letterSpacing: '0.02em',
    color: colors.navy700,
    textAlign: 'center',
    textTransform: 'none',
  },
  responsiveStyles({
    mobile: {
      fontSize: '18px',
      justifySelf: 'center',
      textAlign: 'center',
    },
    tablet: {
      justifySelf: 'center',
      textAlign: 'center',
      fontSize: '28px',
    },
  }),
]);

export const siteTitleCompact = style([
  {
    fontSize: '24px',
  },
  responsiveStyles({
    mobile: {
      fontSize: '16px',
    },
  }),
]);

export const ctaButton = style([
  {
    justifySelf: 'end',
    border: `1px solid ${colors.gold500}`,
    borderRadius: '999px',
    backgroundColor: colors.navy700,
    color: colors.white,
    fontFamily: 'var(--accent-font)',
    fontSize: '14px',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    paddingInline: spacings[24],
    paddingBlock: spacings[10],
    cursor: 'pointer',
    transition: 'background-color 220ms ease, color 220ms ease, border-color 220ms ease',
    selectors: {
      '&:hover': {
        backgroundColor: colors.gold500,
        color: colors.navy700,
      },
    },
  },
  responsiveStyles({
    mobile: {
      display: 'none',
    },
    tablet: {
      display: 'inline-flex',
    },
  }),
]);

export const ctaCompact = style({
  paddingInline: spacings[20],
  paddingBlock: spacings[8],
});

export const bottomRow = style([
  {
    minHeight: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'max-height 220ms ease, opacity 220ms ease, min-height 220ms ease',
    maxHeight: '80px',
    opacity: 1,
  },
  responsiveStyles({
    mobile: {
      display: 'none',
    },
    tablet: {
      display: 'flex',
    },
  }),
]);

export const bottomRowCompact = style({
  minHeight: 0,
  maxHeight: 0,
  opacity: 0,
  pointerEvents: 'none',
});

export const nav = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
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

export const mobileMenuButton = style([
  {
    display: 'none',
    justifySelf: 'end',
    width: spacings[32],
    height: spacings[32],
    padding: 0,
    border: 0,
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: spacings[5],
    cursor: 'pointer',
  },
  responsiveStyles({
    mobile: {
      display: 'inline-flex',
    },
    tablet: {
      display: 'none',
    },
  }),
]);

export const mobileMenuLine = style({
  width: '22px',
  height: '2px',
  borderRadius: '2px',
  backgroundColor: colors.navy700,
  transformOrigin: 'center',
  transition: 'transform 200ms ease, opacity 200ms ease',
});

export const mobileMenuLineTopOpen = style({
  transform: 'translateY(7px) rotate(45deg)',
});

export const mobileMenuLineMiddleOpen = style({
  opacity: 0,
});

export const mobileMenuLineBottomOpen = style({
  transform: 'translateY(-7px) rotate(-45deg)',
});

export const mobileNav = style([
  {
    display: 'none',
    maxHeight: 0,
    overflow: 'hidden',
    transition: 'max-height 220ms ease',
    borderTop: `1px solid ${colors.gold400}55`,
  },
  responsiveStyles({
    mobile: {
      display: 'block',
    },
    tablet: {
      display: 'none',
    },
  }),
]);

export const mobileNavOpen = style({
  maxHeight: '420px',
});

export const mobileNavList = style({
  listStyle: 'none',
  margin: 0,
  padding: `${spacings[12]} 0 ${spacings[16]} 0`,
  display: 'flex',
  flexDirection: 'column',
});

export const mobileNavLink = style({
  display: 'block',
  paddingBlock: spacings[10],
  textDecoration: 'none',
  color: colors.navy700,
  fontFamily: 'var(--base-font)',
  fontSize: '14px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${colors.slate300}`,
  selectors: {
    '&:hover': {
      color: colors.gold500,
    },
  },
});
