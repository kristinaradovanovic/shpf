import '@lib/styles/global.css';
import type { AppProps } from 'next/app';
import { lazy } from 'react';
const PreviewProvider = lazy(() => import('@components/Provider/PreviewProvider'));
import { Settings } from '@schemas/settings/settings.types';
import { fontStyles } from '@lib/styles/fonts/fonts';
export interface SharedPageProps {
  draftMode: boolean;
  token: string;
  settings: Settings | null;
}
export default function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

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
        </main>
      )}
    </>
  );
}
