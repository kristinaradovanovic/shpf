const { createClient, groq } = require('next-sanity');

function assertValue(v, errorMessage) {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

const useCdn = false;

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

const readToken = process.env.SANITY_API_READ_TOKEN || '';

const writeToken = process.env.SANITY_API_WRITE_TOKEN || '';

// see https://www.sanity.io/docs/api-versioning for how versioning works
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';

// Used to generate URLs for previewing your content
const DRAFT_MODE_ROUTE = '/api/draft';

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
const studioUrl = '/studio';

function getClient(preview) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: !!preview?.token,
      studioUrl,
    },
  });
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts');
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    });
  }
  return client;
}

async function getRedirects() {
  const client = getClient();
  const getRedirect = groq`*[_type == 'redirect'] {
    destination,
    source,
    permanent
  }
  `;
  const redirects = await client.fetch(getRedirect);

  console.dir(redirects);
  return redirects;
}
module.exports = {
  getRedirects,
};
