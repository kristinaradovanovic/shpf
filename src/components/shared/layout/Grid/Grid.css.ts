import { responsiveStyles } from '@lib/styles/csshelpers';
import { BREAKPOINTS } from '@lib/styles/variables/breakpoints';
import { spacings } from '@lib/styles/variables/spacings';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const gridStyle = recipe({
  base: [
    {
      display: 'grid',
      margin: '0 auto',
    },
    responsiveStyles({}),
  ],
  variants: {
    default: {
      true: [
        {
          gridTemplateColumns: 'repeat(12, 1fr)',
          maxInlineSize: BREAKPOINTS.max,
        },
      ],
    },
    width: {
      contentMax: {
        maxInlineSize: BREAKPOINTS.max,
      },
      fullBleed: {
        maxInlineSize: '100%',
      },
    },
    inlinePadding: {
      standard: [
        {
          paddingInline: spacings[16],
        },
        responsiveStyles({
          tablet: {
            paddingInline: spacings[24],
          },
          desktop: {
            paddingInline: spacings[32],
          },
        }),
      ],
      none: {
        paddingInline: 0,
      },
      small: {
        paddingInline: spacings[10],
      },
    },

    rows: {
      auto: {
        gridTemplateRows: 'auto',
      },
      1: {
        gridTemplateRows: '1fr',
      },
    },
    height: {
      full: {
        blockSize: '100%',
      },
    },
    reverseDirection: {
      true: {
        gridAutoFlow: 'dense',
        direction: 'rtl',
      },
    },
  },
  defaultVariants: {
    default: true,
    inlinePadding: 'standard',
    rows: 'auto',
  },
});

export type GridStyleVariants = RecipeVariants<typeof gridStyle>;
