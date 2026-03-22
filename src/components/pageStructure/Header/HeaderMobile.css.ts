import { responsiveStyles } from '@lib/styles/csshelpers';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

// Only visible on mobile/tablet (< 1024px)
export const wrapper = style([
  { display: 'block' },
  responsiveStyles({
    desktop: { display: 'none' },
  }),
]);

export const mobileRow = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  paddingBlock: spacings[14],
  columnGap: spacings[16],
});

export const logoLink = style({
  textDecoration: 'none',
});

export const logoBadgeWrap = style({
  position: 'relative',
  width: spacings[48],
  height: spacings[48],
  borderRadius: '999px',
  border: `1px solid ${colors.gold500}`,
  backgroundColor: colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 10px rgba(11, 28, 51, 0.08)',
});

export const logoImage = style({
  objectFit: 'contain',
  padding: spacings[6],
});

export const siteTitle = style({
  justifySelf: 'center',
  fontFamily: 'var(--accent-font)',
  fontSize: '18px',
  lineHeight: 1.1,
  letterSpacing: '0.02em',
  color: colors.navy700,
  textAlign: 'center',
  textTransform: 'none',
});

export const rightControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacings[12],
});

export const languageSwitch = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacings[6],
});

export const langLink = style({
  color: colors.slate500,
  textDecoration: 'none',
  fontFamily: 'var(--base-font)',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transition: 'color 180ms ease',
  selectors: {
    '&:hover': {
      color: colors.navy700,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.gold500}`,
      outlineOffset: '2px',
    },
  },
});

export const langLinkActive = style({
  color: colors.navy700,
  fontWeight: 600,
});

export const langDivider = style({
  color: colors.slate400,
  fontSize: '11px',
  userSelect: 'none',
});

export const mobileMenuButton = style({
  display: 'inline-flex',
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
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${colors.gold500}`,
      outlineOffset: '2px',
    },
  },
});

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

export const mobileNav = style({
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'max-height 220ms ease',
  borderTop: `1px solid ${colors.gold400}55`,
});

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

export const mobileNavItem = style({
  borderBottom: `1px solid ${colors.slate300}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const mobileNavLink = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '24px',
  paddingBlock: spacings[10],
  textDecoration: 'none',
  color: colors.navy700,
  fontFamily: 'var(--base-font)',
  fontSize: '14px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  selectors: {
    '&:hover': {
      color: colors.gold500,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.gold500}`,
      outlineOffset: '2px',
    },
  },
});
