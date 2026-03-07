import Head from 'next/head';

import type { SeoProps } from './Seo.types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Seo({ settings, node }: SeoProps) {
  // const ogImageTitle = settings?.ogImage?.title || '';
  const router = useRouter();
  const [canonicalUrl, setCanonicalUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!window || !window?.location) return;
    // Sanitize URL from query parameters
    const sanitizedPath = window.location.href.split('?')[0];
    setCanonicalUrl(sanitizedPath);
    // Listen to route changes
  }, [router.isReady, router.asPath]);
  return (
    <Head>
      {/* Main */}
      <meta charSet="UTF-8" />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />
      <title>{node?.node?.title}</title>
      {node?.node?.metaTitle && (
        <meta
          name="title"
          content={node?.node?.metaTitle}
        />
      )}
      <meta
        name="keywords"
        content={node?.node?.metaKeywords?.join(', ')}
      />
      <meta
        name="author"
        content={''}
      />
      <meta
        key="description"
        name="description"
        content={node?.node?.metaDescription}
      />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
      />
      <meta
        name="theme-color"
        content="#ffffff"
      />
      <meta
        name="subject"
        content={''}
      />
      <meta
        name="language"
        content={'SV'}
      />
      <meta
        name="revised"
        content={''}
      />
      <meta
        name="robots"
        content={
          node?.node?.includeInSearchEngines
            ? 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
            : 'noindex, nofollow'
        }
      />
      <meta
        name="google-site-verification"
        content={''}
      />
      {/* Typekit FONT */}
      <link
        rel="preload"
        href="https://use.typekit.net/heo5hpl.css"
        as="style"
      />
      <link
        rel="stylesheet"
        href="https://use.typekit.net/heo5hpl.css"
      />
      {/* Canonical */}
      <link
        rel="canonical"
        href={canonicalUrl || ''}
      />

      {/* Favicons */}
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/favicon.svg"
      />
      <link
        rel="shortcut icon"
        href="/favicon.ico"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="manifest"
        href="/site.webmanifest"
      />
      {/* Opengraph meta */}
      <meta
        key="og:site_name"
        property="og:site_name"
        content={''}
      />
      <meta
        key="og:title"
        property="og:title"
        content={node?.node?.metaTitle || settings?.title}
      />
      <meta
        key="og:description"
        property="og:description"
        content={node?.node?.metaDescription}
      />
      <meta
        key="og:type"
        property="og:type"
        content="website"
      />
      <meta
        key="og:locale"
        property="og:locale"
        content="sv_SE"
      />
      <meta
        key="og:url"
        property="og:url"
        content={canonicalUrl || ''}
      />
      <meta
        property="og:image"
        content={node?.node?.ogImage?.url || settings?.defaultOgImage?.url}
      />
      <meta
        key="og:image:alt"
        property="og:image:alt"
        content={node?.node?.ogImageAlt || settings?.defaultOgImageAlt}
      />
      {/* Twitter meta */}
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={''}
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={''}
      />
      <meta
        key="twitter:title"
        name="twitter:title"
        content={node?.node?.metaTitle || settings?.title}
      />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={node?.node?.metaDescription}
      />
      <meta
        key="twitter:image"
        name="twitter:image"
        content={node?.node?.ogImage?.url || settings?.defaultOgImage?.url}
      />
      <meta
        key="twitter:image:alt"
        name="twitter:image:alt"
        content={node?.node?.ogImageAlt || settings?.defaultOgImageAlt}
      />
      {/* Safari BUG: is needed to handle "tel:" links in rich text in <a> tags */}
      <meta
        name="format-detection"
        content="telephone=no"
      />
    </Head>
  );
}
