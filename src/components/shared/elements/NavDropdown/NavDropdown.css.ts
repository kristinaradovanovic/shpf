import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const dropdownWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const dropdownButton = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacings[6],
  color: colors.link,
  fontWeight: 500,

  selectors: {
    '&:hover': {
      color: colors.orangeAccent,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.orangeAccent}`,
      outlineOffset: '4px',
    },
  },
});

export const dropdownLabel = style({
  whiteSpace: 'nowrap',
});

export const dropdownIcon = style({
  transition: 'transform 0.2s ease',
  height: '20px',
  width: '20px',
  fill: colors.link,

  selectors: {
    [`${dropdownWrapper}:hover &`]: {
      transform: 'rotate(180deg)',
      fill: colors.orangeAccent,
    },
    [`${dropdownWrapper}:focus-within &`]: {
      transform: 'rotate(180deg)',
      fill: colors.orangeAccent,
    },
  },
});

export const dropdownMenu = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: spacings[12],
  display: 'flex',
  flexDirection: 'column',
  gap: spacings[12],
  padding: spacings[16],
  minInlineSize: '220px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '12px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-4px)',
  transition: 'all 0.2s ease',

  selectors: {
    [`${dropdownWrapper}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
    [`${dropdownWrapper}:focus-within &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
});
