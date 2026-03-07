export const colors = {
  white: '#FFFFFF',
  green50: '#F0F7F3',
  green100: '#EDF6F2',
  green200: '#E2F4F0',
  green300: '#D4EEE7',
  green400: '#8CE9D4',
  green500: '#8EE2CC',
  beige50: '#FBF8F3',
  beige100: '#F5EDE1',
  beige100_50: 'rgba(245, 237, 225, 0.3)',
  beige200: '#E5E1DB',
  beige300: '#DDC7AC',
  coral50: '#FEF2EE',
  coral100: '#FBEFE9',
  coral200: '#FDDBCD',
  orangeAccent: '#f56845ff',
  text300: '#7C726A',
  text400: '#627084',
  text500: '#6F7684',
  text600: '#374151',
  text900: '#1C2530',
  cardCoral: '#F3DCD2',
  cardYellow: '#fdf3ccff',
  cardPurple: '#E3D9F7',
  cardBlue: '#D1EFF4',
  cardGreen: '#D3EFE9',
  cardPink: '#F8D9DE',
  link: '#555555',
};

export const backgroundColors = {
  White: colors.white,
  CardCoral: colors.cardCoral,
  CardYellow: colors.cardYellow,
  CardPurple: colors.cardPurple,
  CardBlue: colors.cardBlue,
  CardGreen: colors.cardGreen,
  CardPink: colors.cardPink,
};

export const buttonColors = {};

export const textColors = {
  White: colors.white,
  Green50: colors.green50,
  Text300: colors.text300,
  Text400: colors.text400,
  Text500: colors.text500,
  Text600: colors.text600,
  Text900: colors.text900,
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
