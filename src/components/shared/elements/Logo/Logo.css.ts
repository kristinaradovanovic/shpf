import { colors } from '@lib/styles/variables/colors';
import { fontSizes } from '@lib/styles/variables/fonts';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const logoLink = style({
  textDecoration: 'none',
  color: 'inherit',
});

export const logoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacings[8],
});

export const logoIcon = style({
  width: 28,
  height: 28,
  color: colors.gold400,
  flexShrink: 0,
});

export const logoText = style({
  fontSize: fontSizes[22],
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: colors.navy900,
});

export const logoTextStrong = style({
  color: colors.gold400,
});
