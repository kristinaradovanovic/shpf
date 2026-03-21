import { labelText } from '@lib/styles/fonts/typography.css';
import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionTaglineContainer = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
]);

export const sectionTaglineText = style([
  labelText,
  {
    color: colors.gold500,
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderRadius: '100px',
    border: `1px solid ${colors.gold500}`,
    paddingInline: spacings[12],
    paddingBlock: spacings[6],
    margin: 0,
  },
]);
