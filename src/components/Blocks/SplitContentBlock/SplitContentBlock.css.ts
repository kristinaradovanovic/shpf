import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

export const sectionStyle = style([
  {
    paddingBlock: spacings[80],
  },
]);

export const sectionGridStyle = style([
  gridStyle(),
  {
    columnGap: spacings[20],
    rowGap: spacings[20],
  },
]);

export const gridItemStyle = style([
  {
    gridColumn: 'span 12',
  },
  responsiveStyles({
    tablet: {
      gridColumn: 'span 6',
    },
  }),
]);

export const headlineWrapperStyle = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: spacings[16],
    textAlign: 'left',
    paddingBlockStart: spacings[40],
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
