import { responsiveStyles } from '@lib/styles/csshelpers';
import { recipe } from '@vanilla-extract/recipes';

export const sectionBaseStyle = recipe({
  base: [
    {
      position: 'relative',
    },
    responsiveStyles({}),
  ],
});
