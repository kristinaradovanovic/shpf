import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { h2, sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sectionStyle = style([
  {
    paddingBlock: spacings[40],
  },
  responsiveStyles({
    tablet: {
      paddingBlock: spacings[60],
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
    gridColumn: 'span 12',
    display: 'flex',
  },
  variants: {
    alignment: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});

export const contentWrapperStyle = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacings[16],
    width: '100%',
    maxWidth: '860px',
  },
  variants: {
    alignment: {
      left: {
        alignItems: 'flex-start',
        textAlign: 'left',
      },
      center: {
        alignItems: 'center',
        textAlign: 'center',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});

export const titleStyle = recipe({
  base: [
    h2,
    {
      color: colors.navy700,
      margin: 0,
      paddingBlockEnd: spacings[24],
    },
  ],
  variants: {
    alignment: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});

export const descriptionStyle = recipe({
  base: [
    sectionDescription,
    {
      color: colors.slate500,
      maxWidth: '800px',
    },
  ],
  variants: {
    alignment: {
      left: {
        alignSelf: 'flex-start',
        textAlign: 'left',
      },
      center: {
        alignSelf: 'center',
        textAlign: 'center',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});
