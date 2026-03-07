import { colors } from '@lib/styles/variables/colors';
import { style } from '@vanilla-extract/css';

export const navLinkStyle = style({
  color: colors.link,
  textDecoration: 'none',
  fontWeight: 500,
  lineHeight: 1,
  transition: 'color 0.2s ease',

  selectors: {
    '&:hover': {
      color: colors.orangeAccent,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.orangeAccent}`,
      outlineOffset: '4px',
    },
  },
});
