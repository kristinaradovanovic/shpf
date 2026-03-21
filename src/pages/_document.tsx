import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="sv">
      <Head>
        <link
          rel="preload"
          href="https://use.typekit.net/heo5hpl.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/heo5hpl.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
