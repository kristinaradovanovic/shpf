import { responsiveStyles } from '@lib/styles/csshelpers';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const header = style({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 30,
  backgroundColor: 'rgba(251, 251, 249, 0.82)',
  backdropFilter: 'blur(10px) saturate(130%)',
  WebkitBackdropFilter: 'blur(10px) saturate(130%)',
  borderTop: `1px solid ${colors.gold500}B3`,
  borderBottom: `1px solid ${colors.gold500}B3`,
  boxShadow: '0 8px 24px rgba(17, 35, 60, 0.06)',
  transition: 'box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease',
});

export const headerCompact = style({
  backgroundColor: 'rgba(251, 251, 249, 0.9)',
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
