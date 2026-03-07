import { getClient, getSitemapNodes } from '@lib/sanity/sanity.client';
import { CtaLinkType } from '@lib/types/types';
import { extractLinkOrSlug } from '@lib/utils/link-utils';
import { GetServerSideProps } from 'next';

type HreflangEntry = {
  lang: string;
  url: string;
};

type SitemapLocation = {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: Date;
  hrefLangs?: HreflangEntry[];
};

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  // {
  //   url: '/',
  //   changefreq: 'daily',
  //   priority: 1,
  //   lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  // },
  //   { url: '/about', priority: 0.5 },
  //   { url: '/blog', changefreq: 'weekly', priority: 0.7 },
];

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL; // Make sure to configure this
  if (!baseUrl) {
    throw new Error('Missing NEXT_PUBLIC_URL environment variable');
  }
  // ensure that the baseUrl only ends in 1 trailing slash, and so its not // or ///
  const baseUrlEndsWithSlash = baseUrl.endsWith('/');
  const baseUrlWithoutTrailingSlash = baseUrlEndsWithSlash ? baseUrl.slice(0, -1) : baseUrl;
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          // const hreflangTags = location.hrefLangs
          //   ?.map(
          //     (hreflang) =>
          //       `<xhtml:link rel="alternate" hreflang="${hreflang.lang}" href="${baseUrl}/${hreflang.url}" />`
          //   )
          //   .join('\n') || '';
          return `<url>
                    <loc>${baseUrlWithoutTrailingSlash}/${location.url}</loc>
                    <priority>${location.priority}</priority>
                    <changefreq>${location.changefreq || 'weekly'}</changefreq>
                    ${location.lastmod ? `<lastmod>${location.lastmod.toISOString()}</lastmod>` : ''}
                  </url>`;
        })
        .join('')}
  </urlset>
  `;
};

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (process.env.NODE_ENV !== 'production') {
    // prevent search engines from indexing non-production sites
    // prevent sitemap from generating in non-production sites
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return {
      notFound: true,
    };
  }
  const client = getClient();

  // Get list of Post urls
  const [nodes = []]: [CtaLinkType[] | [] | string] = (await Promise.all([
    getSitemapNodes(client),
  ])) as [CtaLinkType[] | [] | string];

  if (typeof nodes === 'string') {
    return {
      notFound: true,
    };
  }

  if (!nodes || (Array.isArray(nodes) && nodes?.length === 0)) {
    return {
      notFound: true,
    };
  }

  const nodeUrls: SitemapLocation[] = nodes
    .filter(({ slug = '' }) => slug)
    .map((node) => {
      if (
        node?.includeInSitemap === false &&
        node?.includeInSitemap !== null &&
        node.hasOwnProperty('includeInSitemap')
      ) {
        return null;
      }
      const slug = extractLinkOrSlug(node);
      return {
        url: node?.language ? `${node.language}/${slug}` : slug,
        priority: 0.5,
        changefreq: 'monthly',
        lastmod: new Date(node._updatedAt || ''),
      };
    })
    .filter((node) => node !== null) as SitemapLocation[];

  // Return the default urls, combined with dynamic urls above
  const locations = [...defaultUrls, ...nodeUrls];

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml');

  // Set caching header for 24 hours
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');

  res.write(createSitemap(locations));
  res.end();

  return {
    props: {},
  };
};
