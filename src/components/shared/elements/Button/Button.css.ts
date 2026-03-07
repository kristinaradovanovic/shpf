import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const buttonStyle = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: spacings[8],
    paddingInline: spacings[24],
    blockSize: '40px',
    borderRadius: '10px',
    border: '2px solid transparent',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 200ms ease, border-color 200ms ease',
    whiteSpace: 'nowrap',
    minWidth: '180px',
  },

  variants: {
    variant: {
      orange: {
        backgroundColor: colors.orangeAccent,
        color: colors.white,

        selectors: {
          '&:hover': {
            backgroundColor: colors.coral200,
            color: colors.orangeAccent,
            borderColor: colors.orangeAccent,
          },
        },
      },

      orangeWithIcon: {
        backgroundColor: colors.orangeAccent,
        color: colors.white,

        selectors: {
          '&:hover': {
            backgroundColor: colors.coral200,
            color: colors.orangeAccent,
            borderColor: colors.orangeAccent,
          },
        },
      },

      green: {
        backgroundColor: colors.green500,
        color: colors.text500,

        selectors: {
          '&:hover': {
            backgroundColor: colors.green400,
          },
        },
      },

      whiteOutlined: {
        backgroundColor: colors.white,
        color: colors.text500,
        borderColor: colors.green500,

        selectors: {
          '&:hover': {
            backgroundColor: colors.green50,
          },
        },
      },
    },

    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
});

export const buttonIcon = style({
  inlineSize: '16px',
  blockSize: '16px',
  color: 'currentColor',
});
