export const colors = {
  white: '#FFFFFF',
  gold400: '#CBA616',
  gold500: '#B38719',
  gold600: '#B4891F',
  navy700: '#11233C',
  slate300: '#B3BAC5',
  slate400: '#8D9BAD',
  slate500: '#5C708A',
  slate600: '#5E728B',
  blue700: '#24436C',
  sand100: '#F8F6F2',
  sand50: '#FBFBF9',
  mist200: '#DAE0E7',
  blue600: '#25466F',
  blue800: '#1C3C63',
  slate700: '#2B3F57',
  navy900: '#0B1C33',
  highlightCardDark: '#163358',
};

export const backgroundColors = {
  White: colors.white,
  Gold400: colors.gold400,
  Gold500: colors.gold500,
  Navy700: colors.navy700,
  Slate500: colors.slate500,
  Blue700: colors.blue700,
  Sand100: colors.sand100,
  Sand50: colors.sand50,
  Mist200: colors.mist200,
  Blue600: colors.blue600,
  Blue800: colors.blue800,
  Slate700: colors.slate700,
  Navy900: colors.navy900,
};

export const buttonColors = {
  Gold400: colors.gold400,
  Gold500: colors.gold500,
  Blue700: colors.blue700,
  Navy700: colors.navy700,
  Navy900: colors.navy900,
  White: colors.white,
};

export const textColors = {
  White: colors.white,
  Gold400: colors.gold400,
  Gold500: colors.gold500,
  Gold600: colors.gold600,
  Navy700: colors.navy700,
  Slate400: colors.slate400,
  Slate500: colors.slate500,
  Slate600: colors.slate600,
  Blue700: colors.blue700,
  Blue600: colors.blue600,
  Blue800: colors.blue800,
  Slate700: colors.slate700,
  Navy900: colors.navy900,
};

export type TextColorTypes = keyof typeof textColors;

export const textColorKeys = Object.fromEntries(
  Object.keys(textColors).map((key) => [key, key]),
) as Record<TextColorTypes, TextColorTypes>;

export type BackgroundColorTypes = keyof typeof backgroundColors;
export type BackgroundColorKeys = keyof typeof backgroundColors;
export type ButtonColorTypes = keyof typeof buttonColors;
export type ButtonColorKeys = keyof typeof buttonColors;

export const backgroundColorKeys = Object.fromEntries(
  Object.keys(backgroundColors)?.map((key) => [key, key]),
) as Record<BackgroundColorKeys, BackgroundColorKeys>;

export const buttonColorKeys = Object.fromEntries(
  Object.keys(buttonColors)?.map((key) => [key, key]),
) as Record<ButtonColorKeys, ButtonColorKeys>;

export const highlightCardColors = {
  White: colors.white,
  Dark: colors.highlightCardDark,
};

export type HighlightCardColorTypes = keyof typeof highlightCardColors;
export type HighlightCardColorKeys = keyof typeof highlightCardColors;

export const highlightCardColorKeys = Object.fromEntries(
  Object.keys(highlightCardColors).map((key) => [key, key]),
) as Record<HighlightCardColorKeys, HighlightCardColorKeys>;
