import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { bodyCopy, h2 } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sectionStyle = style([
  {
    paddingBlock: spacings[40],
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

export const richTextStyle = recipe({
  base: [
    bodyCopy,
    {
      color: colors.slate500,
      width: '100%',
      margin: 0,
    },
  ],
  variants: {
    alignment: {
      left: {},
      center: {
        textAlign: 'center',
      },
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
});

globalStyle(`${richTextStyle({ alignment: 'left' })} p`, {
  margin: 0,
});

globalStyle(`${richTextStyle({ alignment: 'left' })} p + p`, {
  marginTop: spacings[12],
});

globalStyle(`${richTextStyle({ alignment: 'center' })} p`, {
  margin: 0,
});

globalStyle(`${richTextStyle({ alignment: 'center' })} p + p`, {
  marginTop: spacings[12],
});

globalStyle(`${richTextStyle({ alignment: 'left' })} a`, {
  color: colors.navy700,
  textDecoration: 'underline',
});

globalStyle(`${richTextStyle({ alignment: 'center' })} a`, {
  color: colors.navy700,
  textDecoration: 'underline',
});
