import { globalStyle } from '@vanilla-extract/css';
import { responsiveStyles } from '@lib/styles/csshelpers';

globalStyle('html, body', {
  all: 'unset',
  margin: 0,
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  WebkitTextSizeAdjust: '100%',
  WebkitTapHighlightColor: 'transparent',
  scrollbarWidth: 'thin',
});

globalStyle('#index-page > section:first-of-type', {
  ...responsiveStyles({
    desktop: {
      marginTop: '0',
    },
  }),
});

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('main', {
  fontFamily: 'var(--base-font)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: 0,
});

globalStyle('nav a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('nav ul, nav li', {
  listStyle: 'none',
});

globalStyle('a', {
  textDecoration: 'none',
  cursor: 'pointer',
});

// Swiper globalstyles
globalStyle('.swiper-wrapper > .swiper-slide', {
  width: 'auto !important',
});

globalStyle('.swiper-wrapper', {
  WebkitTransitionTimingFunction: 'linear!important',
  transitionTimingFunction: 'linear!important',
});
