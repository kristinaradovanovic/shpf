import { labelText } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style, styleVariants } from '@vanilla-extract/css';

const containerBase = style({
  display: 'flex',
  alignItems: 'center',
});

export const sectionTaglineContainer = styleVariants({
  left: [
    containerBase,
    {
      justifyContent: 'flex-start',
    },
  ],
  center: [
    containerBase,
    {
      justifyContent: 'center',
    },
  ],
});

const textBase = style([
  labelText,
  {
    color: colors.gold500,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    borderRadius: '100px',
    border: `1px solid ${colors.gold500}`,
    paddingInline: spacings[12],
    paddingBlock: spacings[6],
    margin: 0,
  },
]);

export const sectionTaglineText = styleVariants({
  left: [
    textBase,
    {
      textAlign: 'left',
    },
  ],
  center: [
    textBase,
    {
      textAlign: 'center',
    },
  ],
});
