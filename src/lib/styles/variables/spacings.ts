import { pxToRem } from '../csshelpers';

export const spacings = {
  0: pxToRem(0),
  4: pxToRem(4),
  5: pxToRem(5),
  6: pxToRem(6),
  8: pxToRem(8),
  10: pxToRem(10),
  12: pxToRem(12),
  14: pxToRem(14),
  16: pxToRem(16),
  18: pxToRem(18),
  20: pxToRem(20),
  24: pxToRem(24),
  25: pxToRem(25),
  26: pxToRem(26),
  28: pxToRem(28),
  30: pxToRem(30),
  32: pxToRem(32),
  35: pxToRem(35),
  40: pxToRem(40),
  48: pxToRem(48),
  60: pxToRem(60),
  70: pxToRem(70),
  80: pxToRem(80),
  90: pxToRem(90),
  100: pxToRem(100),
  120: pxToRem(120),
  140: pxToRem(140),
  145: pxToRem(145),
  160: pxToRem(160),
  180: pxToRem(180),
  200: pxToRem(200),
  650: pxToRem(650),
  700: pxToRem(700),
};

export const borderRadius = {
  borderSubtle: '4px',
  borderBold: '16px',
};

type ResponsiveSpacing = { mobile: string; desktop: string };
export const blockSpacing: Record<'none' | 'small' | 'medium' | 'large', ResponsiveSpacing> = {
  none: { mobile: spacings[0], desktop: spacings[0] },
  small: { mobile: spacings[0], desktop: spacings[0] },
  medium: { mobile: spacings[0], desktop: spacings[0] },
  large: { mobile: spacings[0], desktop: spacings[0] },
};

export type BlockSpacingTypes = keyof typeof blockSpacing;
export type BlockSpacingKeys = keyof typeof blockSpacing;

export const blockSpacingKeys = Object.fromEntries(
  Object.keys(blockSpacing)?.map((key) => [key, key]),
) as Record<BlockSpacingKeys, BlockSpacingKeys>;
