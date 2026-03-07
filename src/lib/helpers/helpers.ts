import { BREAKPOINTS } from '@lib/styles/variables/breakpoints';

type ImageSizesProps = {
  max?: string;
  desktop?: string;
  tablet?: string;
  mobile?: string;
};

export const setImageSizes = ({ max, desktop, tablet, mobile }: ImageSizesProps) => {
  const sizes = [
    max && `(min-width: ${BREAKPOINTS.max}px) ${max}`,
    desktop && `(min-width: ${BREAKPOINTS.desktop}px) ${desktop}`,
    tablet && `(min-width: ${BREAKPOINTS.tablet}px) ${tablet}`,
    mobile && `${mobile}`,
  ]
    .filter(Boolean)
    .join(', ');

  return sizes;
};
