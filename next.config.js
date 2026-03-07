// @ts-check
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const { getRedirects } = require('./redirects.js');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_SANITY_CDN_URL || 'cdn.sanity.io',
      },
      {
        hostname: 'source.unsplash.com',
      },
    ],
  },
  env: {
    SC_DISABLE_SPEEDY: 'false', // makes styled-components as fast in dev mode as it is in production mode
  },
  i18n: {
    defaultLocale: 'sv',
    locales: ['sv', 'en'],
    localeDetection: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // plugins: [
  //   new VanillaExtractPlugin({
  //     outputCss: true, // This option ensures CSS files are generated
  //   }),
  // ],
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  redirects: async () => {
    if (process.env.VERCEL_ENV !== 'production') {
      return [];
    }
    try {
      const redirects = await getRedirects();
      if (
        redirects.some(
          // @ts-ignore
          ({ source, destination }) => !source.startsWith('/') || !destination.startsWith('/'),
        )
      ) {
        console.error(
          'ERROR: Invalid redirect found, all source and destination paths must start with a slash',
        );
        return [];
      }
      return redirects;
    } catch (error) {
      console.error('Failed to fetch redirects:', error);
      return [];
    }
  },
  reactStrictMode: false,
  output: 'standalone',
};
module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));
