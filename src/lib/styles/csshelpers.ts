/* import { BackgroundColorTypes } from '@lib/styles/variables/colors';
 */ import { StyleRule } from '@vanilla-extract/css';
import { mediaSizes } from './variables/breakpoints';

export function pxToRem(px: number | string, baseFontSize: number = 16): string {
  px = typeof px === 'string' ? Number.parseInt(px) : px;
  if (isNaN(px)) {
    throw new Error(`pxToRem: px value must be a number. Got: ${px}`);
  }
  if (px < 0) {
    throw new Error(`pxToRem: px value must be greater than or equal to 0. Got: ${px}`);
  }
  if (baseFontSize <= 0) {
    throw new Error(`pxToRem: baseFontSize value must be greater than 0. Got: ${baseFontSize}`);
  }
  if (px === 0) return '0rem';
  const decimalPlaces = 3;
  const mulitplier = Math.pow(10, decimalPlaces);
  return `${Math.ceil((px / baseFontSize) * mulitplier) / mulitplier}rem`;
}

type ResponsiveStyleProps = {
  mobile?: StyleRule;
  tablet?: StyleRule;
  desktop?: StyleRule;
  max?: StyleRule;
};

export const responsiveStyles = ({ mobile, tablet, desktop, max }: ResponsiveStyleProps) => ({
  '@media': {
    ...(mobile && { [mediaSizes.mobile]: mobile }),
    ...(tablet && { [mediaSizes.tablet]: tablet }),
    ...(desktop && { [mediaSizes.desktop]: desktop }),
    ...(max && { [mediaSizes.max]: max }),
  },
});

/**
 * Apply proper media query for devices that support hover state.
 * Use inside 'selectors' block.
 *
 * @param style
 * @returns
 */
export const hoverStyle = (style: StyleRule) => ({
  '&:hover': {
    '@media': {
      '(hover: hover)': {
        ...style,
      },
    },
  },
});

/* export const setColorTheme = (backgroundColor: BackgroundColorTypes | undefined) => {
  if (backgroundColor === 'Primary') {
    return 'light';
  } else {
    return 'dark';
  }
};
 */
