import { responsiveStyles } from '@/lib/styles/csshelpers';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[60],
  },
  responsiveStyles({
    desktop: {
      paddingBlock: spacings[80],
    },
  }),
]);

export const gridItemStyle = style([
  {
    gridColumn: 'span 12',
    paddingBlockEnd: spacings[60],
  },
]);
