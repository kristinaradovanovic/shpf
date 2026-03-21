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
    backgroundColor: colors.gold400,
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 200ms ease, border-color 200ms ease',
    whiteSpace: 'nowrap',
    minWidth: '180px',
  },
  variants: {
    variant: {
      orange: {
        backgroundColor: colors.gold400,
        color: colors.white,
        border: 0,
        selectors: {
          '&:hover': {
            backgroundColor: colors.sand100,
            color: colors.gold400,
            borderColor: colors.gold400,
          },
        },
      },
      orangeWithIcon: {
        backgroundColor: colors.gold400,
        color: colors.white,
        border: 0,
        selectors: {
          '&:hover': {
            backgroundColor: colors.sand100,
            color: colors.gold400,
            borderColor: colors.gold400,
          },
        },
      },
      green: {
        backgroundColor: colors.blue700,
        color: colors.white,
        border: 0,
        selectors: {
          '&:hover': {
            backgroundColor: colors.blue600,
          },
        },
      },
      whiteOutlined: {
        backgroundColor: colors.white,
        color: colors.slate500,
        borderColor: colors.blue700,
        selectors: {
          '&:hover': {
            backgroundColor: colors.sand50,
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
