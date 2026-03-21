import { colors } from '@lib/styles/variables/colors';
import { style } from '@vanilla-extract/css';

export const navLinkStyle = style({
  color: colors.navy700,
  textDecoration: 'none',
  fontWeight: 500,
  lineHeight: 1,
  transition: 'color 0.2s ease',

  selectors: {
    '&:hover': {
      color: colors.gold400,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.gold400}`,
      outlineOffset: '4px',
    },
  },
});
