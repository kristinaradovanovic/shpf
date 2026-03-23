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
    blockSize: '50px',
    borderRadius: 0,
    backgroundColor: colors.gold400,
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background-color 200ms ease, border-color 200ms ease',
    whiteSpace: 'nowrap',
    minWidth: '180px',
    border: '2px solid transparent',
  },
  variants: {
    variant: {
      golden: {
        backgroundColor: colors.gold400,
        color: colors.navy700,
        selectors: {
          '&:hover': {
            backgroundColor: colors.gold500,
            color: colors.navy700,
          },
          '&:active': {
            backgroundColor: colors.gold500,
          },
        },
      },
      whiteOutlined: {
        backgroundColor: 'transparent',
        color: colors.white,
        borderColor: colors.white,
        selectors: {
          '&:hover': {
            backgroundColor: colors.white,
            color: colors.navy700,
            borderColor: colors.white,
          },
          '&:active': {
            backgroundColor: colors.white,
            color: colors.navy700,
            borderColor: colors.white,
          },
        },
      },
      navyOutlined: {
        backgroundColor: 'transparent',
        color: colors.navy700,
        borderColor: colors.navy700,
        selectors: {
          '&:hover': {
            backgroundColor: colors.navy700,
            color: colors.white,
            borderColor: colors.navy700,
          },
          '&:active': {
            backgroundColor: colors.navy900,
            color: colors.white,
            borderColor: colors.navy900,
          },
        },
      },
      navy: {
        backgroundColor: colors.navy700,
        color: colors.white,
        selectors: {
          '&:hover': {
            backgroundColor: colors.navy900,
          },
          '&:active': {
            backgroundColor: colors.navy900,
          },
        },
      },
      headerPremium: {
        backgroundColor: colors.navy700,
        color: colors.white,
        borderColor: colors.gold500,
        borderRadius: '999px',
        fontFamily: 'var(--accent-font)',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        minWidth: 'unset',
        blockSize: '44px',
        paddingInline: spacings[24],
        selectors: {
          '&:hover': {
            backgroundColor: colors.gold500,
            color: colors.navy700,
            borderColor: colors.gold500,
          },
          '&:active': {
            backgroundColor: colors.gold500,
            color: colors.navy700,
            borderColor: colors.gold500,
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
    isActive: {
      true: {
        backgroundColor: colors.white,
        color: colors.navy700,
        borderColor: colors.white,
      },
    },
  },
});

export const buttonIcon = style({
  inlineSize: '16px',
  blockSize: '16px',
  color: 'currentColor',
});
