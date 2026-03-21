import { colors } from '@lib/styles/variables/colors';
import { spacings } from '@lib/styles/variables/spacings';
import { fontSizes } from '@lib/styles/variables/fonts';
import { fonts } from '@lib/styles/variables/fonts';
import { style } from '@vanilla-extract/css';
import { responsiveStyles } from '@/lib/styles/csshelpers';

export const card = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacings[16],
    paddingBlock: spacings[40],
    paddingInline: spacings[20],
    backgroundColor: colors.sand50,
    border: `1px solid ${colors.mist200}`,
    minHeight: '380px',
    transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
  },
  responsiveStyles({
    desktop: {
      selectors: {
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 14px 28px rgba(17, 35, 60, 0.08)',
          borderColor: colors.gold600,
        },
      },
    },
  }),
]);

export const imageWrapper = style({
  position: 'relative',
  width: spacings[160],
  height: spacings[160],
  borderRadius: '50%',
  overflow: 'hidden',
  flexShrink: 0,
});

export const imagePlaceholder = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: colors.mist200,
});

export const nameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacings[4],
  textAlign: 'center',
});

export const name = style({
  fontFamily: 'var(--accent-font)',
  fontWeight: 600,
  fontSize: fontSizes[20],
  lineHeight: '1.4',
  color: colors.navy700,
});

export const jobTitle = style({
  fontFamily: fonts.baseFont,
  fontWeight: 400,
  fontSize: fontSizes[14],
  lineHeight: '1.4',
  color: colors.gold600,
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacings[4],
  textAlign: 'center',
});

export const hotel = style({
  fontFamily: fonts.baseFont,
  fontWeight: 400,
  fontSize: fontSizes[14],
  lineHeight: '1.4',
  color: colors.slate600,
});

export const locationWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacings[4],
});

export const locationText = style({
  fontFamily: fonts.baseFont,
  fontWeight: 400,
  fontSize: fontSizes[14],
  lineHeight: '1.4',
  color: colors.slate400,
});

export const locationIcon = style({
  color: colors.slate400,
  flexShrink: 0,
});
