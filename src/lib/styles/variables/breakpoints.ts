export type Breakpoints<T> = {
  mobile: T;
  tablet: T;
  desktop: T;
  max: T;
};

export const BREAKPOINTS: Breakpoints<number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  max: 1200,
};

export const mediaSizes: Breakpoints<string> = {
  mobile: `screen and (min-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `screen and (min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `screen and (min-width: ${BREAKPOINTS.desktop}px)`,
  max: `screen and (min-width: ${BREAKPOINTS.max}px)`,
};
