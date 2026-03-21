import { colors } from '@lib/styles/variables/colors';
import { style, styleVariants } from '@vanilla-extract/css';

export const highlightText = style({
  background: 'linear-gradient(90deg, #E3C76A 0%, #F2D98A 20%, #CFA63A 40%, #B98D20 72%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const textColorVariants = styleVariants({
  white: { color: colors.white },
  navy700: { color: colors.navy700 },
});
