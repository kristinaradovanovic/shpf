import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { bodyCopy, h2 } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { globalStyle, style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[60],
  },
]);

export const sectionGridStyle = style([
  gridStyle(),
  {
    columnGap: spacings[20],
    rowGap: spacings[20],
  },
]);

export const gridItemStyle = style([
  {
    gridColumn: 'span 12',
  },
]);

export const contentWrapperStyle = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: spacings[20],
  },
]);

export const titleStyle = style([
  h2,
  {
    color: colors.navy700,
    margin: 0,
  },
]);

export const richTextStyle = style([
  bodyCopy,
  {
    color: colors.slate500,
    width: '100%',
    margin: 0,
  },
]);

globalStyle(`${richTextStyle} p`, {
  margin: 0,
});

globalStyle(`${richTextStyle} p + p`, {
  marginTop: spacings[12],
});

globalStyle(`${richTextStyle} a`, {
  color: colors.navy700,
  textDecoration: 'underline',
});
