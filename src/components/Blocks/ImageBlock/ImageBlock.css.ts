import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sectionStyle = style([
  {
    paddingBlockStart: spacings[10],
    paddingBlockEnd: 0,
  },
  responsiveStyles({
    tablet: {
      paddingBlock: spacings[40],
    },
  }),
]);

export const sectionGridStyle = style([
  gridStyle(),
  {
    columnGap: spacings[20],
    rowGap: spacings[20],
  },
]);

export const gridItemStyle = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    span: {
      'span-6': [
        {
          gridColumn: 'span 12',
        },
        responsiveStyles({
          tablet: {
            gridColumn: 'span 6',
          },
        }),
      ],
      'span-12': {
        gridColumn: 'span 12',
      },
    },
  },
  defaultVariants: {
    span: 'span-12',
  },
});

export const imageContainerStyle = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

export const imageStyle = style({
  objectFit: 'cover',
});
