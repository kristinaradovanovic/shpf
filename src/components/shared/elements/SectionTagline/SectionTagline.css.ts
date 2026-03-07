import { labelText } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { keyframes, style } from '@vanilla-extract/css';

export const blink = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const blinkingIconStyle = style([
  {
    animation: `${blink} 1.5s ease-in-out infinite`,
    height: spacings[20],
    width: spacings[20],
  },
]);

export const sectionTaglineContainer = style([
  {
    display: 'flex',
    alignItems: 'center',
    columnGap: spacings[10],
  },
]);

export const sectionTaglineText = style([
  labelText,
  {
    color: colors.text900,
  },
]);
