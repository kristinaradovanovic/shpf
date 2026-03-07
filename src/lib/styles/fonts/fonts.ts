import clsx from 'clsx';
import { Inter, Manrope /* Poppins  */ } from 'next/font/google';

export type fontCSSVariables = '--base-font' | '--accent-font';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--base-font',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--accent-font',
  display: 'swap',
});

export const fontStyles = clsx(inter.variable, manrope.variable);
