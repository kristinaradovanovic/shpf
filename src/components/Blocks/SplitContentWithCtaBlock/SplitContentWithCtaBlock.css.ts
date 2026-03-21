import { responsiveStyles } from '@/lib/styles/csshelpers';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[40],
  },
  responsiveStyles({
    tablet: {
      paddingBlock: spacings[60],
    },
    desktop: {
      paddingBlock: spacings[80],
    },
  }),
]);

export const gridItemStyle = style([
  {
    gridColumn: 'span 12',
    paddingBlockEnd: spacings[40],
  },
  responsiveStyles({
    desktop: {
      paddingBlockEnd: spacings[60],
    },
  }),
]);
