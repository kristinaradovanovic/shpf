import clsx from 'clsx';
import { Cormorant_Garamond, Inter } from 'next/font/google';

export type fontCSSVariables = '--base-font' | '--accent-font';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--base-font',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--accent-font',
  display: 'swap',
});

export const fontStyles = clsx(inter.variable, cormorantGaramond.variable);
