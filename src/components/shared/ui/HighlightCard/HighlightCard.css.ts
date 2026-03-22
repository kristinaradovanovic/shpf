import { bodyCopy, h4 } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { fontSizes } from '@/lib/styles/variables/fonts';
import { spacings } from '@/lib/styles/variables/spacings';
import { style, styleVariants } from '@vanilla-extract/css';

export const cardStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: spacings[16],
  minHeight: '280px',
  paddingInline: spacings[24],
  paddingBlock: spacings[24],
});

export const cardVariantStyle = styleVariants({
  White: {
    backgroundColor: colors.white,
    color: colors.navy700,
  },
  Dark: {
    backgroundColor: colors.highlightCardDark,
    color: colors.white,
  },
});

export const iconWrapperStyle = style({
  position: 'relative',
  width: spacings[60],
  height: spacings[60],
  flexShrink: 0,
});

export const iconStyle = style({
  objectFit: 'contain',
});

export const titleStyle = style([
  h4,
  {
    margin: 0,
  },
]);

export const descriptionStyle = style([
  bodyCopy,
  {
    color: colors.slate300,
    margin: 0,
    maxWidth: '30ch',
    fontSize: fontSizes[14],
  },
]);
