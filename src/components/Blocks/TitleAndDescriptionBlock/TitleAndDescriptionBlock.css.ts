import { gridStyle } from '@/components/shared/layout/Grid/Grid.css';
import { responsiveStyles } from '@/lib/styles/csshelpers';
import { h2, sectionDescription } from '@/lib/styles/fonts/typography.css';
import { colors } from '@/lib/styles/variables/colors';
import { spacings } from '@/lib/styles/variables/spacings';
import { style } from '@vanilla-extract/css';

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

export const gridItemStyle = style([
  {
    gridColumn: 'span 12',
    display: 'flex',
    justifyContent: 'center',
  },
]);

export const contentWrapperStyle = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: spacings[16],
    width: '100%',
    maxWidth: '860px',
  },
]);

export const titleStyle = style([
  h2,
  {
    color: colors.navy700,
    margin: 0,
    textAlign: 'center',
    paddingBlockEnd: spacings[24],
  },
]);

export const descriptionStyle = style([
  sectionDescription,
  {
    color: colors.slate500,
    maxWidth: '800px',
    alignSelf: 'center',
  },
]);
