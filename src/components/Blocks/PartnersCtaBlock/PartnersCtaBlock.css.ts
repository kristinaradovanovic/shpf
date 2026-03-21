import { sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[80],
    backgroundColor: colors.sand100,
  },
]);

export const headingItemStyle = style([
  {
    gridColumn: 'span 12',
    paddingBlockStart: spacings[48],
    paddingBlockEnd: spacings[38],
  },
]);

export const headlineWrapperStyle = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacings[16],
    textAlign: 'center',
  },
]);

export const descriptionStyle = style([
  sectionDescription,
  {
    color: colors.slate500,
    maxWidth: '600px',
    alignSelf: 'center',
  },
]);

export const sliderGridItemStyle = style({
  gridColumn: 'span 12',
  overflow: 'hidden',
  paddingBlockStart: spacings[24],
});

export const sliderStyle = style({
  overflow: 'visible',
});

export const partnerCardStyle = style({
  width: '240px',
  minHeight: '220px',
  border: `1px solid ${colors.mist200}`,
  backgroundColor: colors.sand50,
  padding: spacings[16],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacings[14],
});

export const partnerCardImageWrapperStyle = style({
  position: 'relative',
  width: '140px',
  height: '140px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: `1px solid ${colors.mist200}`,
  backgroundColor: colors.white,
});

export const partnerCardImageStyle = style({
  objectFit: 'cover',
});

export const partnerNameStyle = style({
  color: colors.navy700,
  textAlign: 'center',
  fontWeight: 600,
});
