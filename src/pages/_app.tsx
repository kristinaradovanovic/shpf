import '@lib/styles/global.css';
import type { AppProps } from 'next/app';
import { lazy } from 'react';
const PreviewProvider = lazy(() => import('@components/Provider/PreviewProvider'));
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { Settings } from '@schemas/settings/settings.types';
import { defaultDataLayerName } from '@lib/constants/constants';
import { fontStyles } from '@lib/styles/fonts/fonts';
export interface SharedPageProps {
  draftMode: boolean;
  token: string;
  settings: Settings;
}
export default function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token, settings } = pageProps;

  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <main className={fontStyles}>
            <Component {...pageProps} />
          </main>
        </PreviewProvider>
      ) : (
        <main className={fontStyles}>
          <Component {...pageProps} />
          {settings?.gtmID && (
            <GoogleTagManager
              gtmId={process.env.NODE_ENV === 'production' ? settings?.gtmID || '' : 'GTM-TEST'}
              dataLayerName={settings?.gtmDataLayerName || defaultDataLayerName}
            />
          )}
          {settings?.gaID && (
            <GoogleAnalytics
              gaId={process.env.NODE_ENV === 'production' ? settings?.gaID || '' : 'GA-TEST'}
              dataLayerName={settings?.gaDataLayerName || defaultDataLayerName}
            />
          )}
        </main>
      )}
    </>
  );
}
