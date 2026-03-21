import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { colors, textColors } from './variables/colors';
import { recipe } from '@vanilla-extract/recipes';
import { bodyCopy } from './fonts/typography.css';
import { spacings } from './variables/spacings';
import { responsiveStyles } from './csshelpers';

export const unStyledLink = style([
  {
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
  },
]);

export const imageWrapper = style([
  {
    position: 'relative',
    inlineSize: '100%',
    overflow: 'hidden',
  },
]);

//Used for cursor animation in "typed" animated text
export const blinkCursor = keyframes({
  '0%, 50%': { opacity: 1 },
  '51%, 100%': { opacity: 0 },
});

export const textColorStyle = styleVariants(textColors, (textColor) => [{ color: textColor }]);

// Used for Accordions
export const sharedAccordionItem = recipe({
  base: [
    {
      borderBlockStart: '1px solid rgba(255, 255, 255, 0.5)',
      selectors: {
        '&:last-child': {
          borderBlockEnd: '1px solid rgba(255, 255, 255, 0.5)',
        },
      },
    },
  ],
  variants: {
    lightBackground: {
      true: [
        {
          borderBlockStart: `1px solid ${colors.mist200}`,
          selectors: {
            '&:last-child': {
              borderBlockEnd: `1px solid ${colors.mist200}`,
            },
          },
        },
      ],
    },
  },
});

export const sharedAccordionTrigger = recipe({
  base: [
    {
      paddingBlock: spacings[24],
      background: 'transparent',
      border: 'none',
      paddingInline: 0,
      cursor: 'pointer',
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between',
      inlineSize: '100%',
    },
  ],
  variants: {
    faq: {
      true: [
        {
          alignItems: 'center',
          columnGap: spacings[48],
        },
      ],
    },
  },
});

// Used for Accordion animations
const iconTransition = 'opacity 300ms ease-in-out, transform 300ms ease-in-out';
const open = keyframes({
  from: {
    blockSize: 0,
  },
  to: {
    blockSize: 'var(--radix-accordion-content-height)',
  },
});

const close = keyframes({
  from: {
    blockSize: 'var(--radix-accordion-content-height)',
  },
  to: {
    blockSize: 0,
  },
});
export const sharedAccordionIconContainer = recipe({
  base: [
    {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      blockSize: '24px',
      inlineSize: '24px',
    },
  ],
});

export const sharedAccordionIconBase = style([
  {
    position: 'absolute',
    top: 0,
    right: '2px',
  },
]);

export const sharedAccordionIconMinus = style([
  sharedAccordionIconBase,
  {
    selectors: {
      [`${sharedAccordionTrigger()}[data-state=open] &`]: {
        transition: iconTransition,
        opacity: 1,
      },
      [`${sharedAccordionTrigger()}[data-state=closed] &`]: {
        opacity: 0,
        transition: iconTransition,
        transform: 'rotate(90deg)',
      },
    },
  },
]);

export const sharedAccordionIconPlus = style([
  sharedAccordionIconBase,
  {
    selectors: {
      [`${sharedAccordionTrigger()}[data-state=open] &`]: {
        transition: iconTransition,
        transform: 'rotate(-90deg)',
        opacity: 0,
      },
      [`${sharedAccordionTrigger()}[data-state=closed] &`]: {
        opacity: 1,
        transition: iconTransition,
      },
    },
  },
]);

export const sharedAccordionContent = style([
  {
    overflow: 'hidden',
    selectors: {
      '&[data-state=open]': {
        animation: open,
        animationDuration: '500ms',
        animationFillMode: 'forwards',
      },
      '&[data-state=closed]': {
        animation: close,
        animationDuration: '300ms',
        animationFillMode: 'forwards',
      },
    },
  },
]);

export const sharedAccordionInfoText = recipe({
  base: [
    bodyCopy,
    {
      paddingBlockEnd: spacings[24],
      color: colors.slate500,
    },
    responsiveStyles({
      desktop: {
        paddingBlockStart: spacings[4],
        paddingBlockEnd: spacings[32],
        maxInlineSize: '325px',
      },
    }),
  ],
});
