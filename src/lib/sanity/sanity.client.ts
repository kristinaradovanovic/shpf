import * as sharedQueries from '@lib/queries/queries';
import { apiVersion, dataset, projectId, studioUrl, useCdn } from '@lib/sanity/sanity.api';
import type * as sharedTypes from '@lib/types/types';
import { extractLinkOrSlug } from '@lib/utils/link-utils';
import {
  getParentWithNodeById,
  getParentWithNodeByIdFiltered,
  getParentWithNodeBySlug,
  getParentWithNodeBySlugTranslations,
  getParentWithRootNode,
  getParentWithRootNodeTranslations,
  getSitemapAllNodesQuery,
} from '@schemas/node/node.queries';
import { getAllPagesSlugsQuery } from '@schemas/page/page.queries';
import { createClient, type SanityClient } from 'next-sanity';

export function getClient(
  preview?: { token: string },
  perspective?: 'previewDrafts' | 'published' | 'raw',
): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: perspective ? perspective : 'published',
    stega: {
      enabled: !!preview?.token,
      studioUrl,
    },
    withCredentials: true,
  });
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts');
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: perspective ? perspective : 'previewDrafts',
    });
  }
  return client;
}

export const getSanityImageConfig = () => getClient();

export async function getAllPagesSlugs(
  client: SanityClient,
): Promise<string | { params: { slug: string[] }; locale: string | null }[]> {
  const pages: sharedTypes.CtaLinkType[] = (await client.fetch(getAllPagesSlugsQuery)) || [];

  if (!pages) {
    console.error('ERROR: failed fetch for all pages');
    return [];
  }

  const paths = pages?.map((node) => {
    if (node?.isRoot) return { params: { slug: [] }, locale: node?.language ?? null };

    const fullPath = extractLinkOrSlug(node, true);
    const slugPieces = fullPath.split('/');

    if (slugPieces.length === 0) {
      return { params: { slug: [] }, locale: node?.language ?? null };
    }
    return { params: { slug: slugPieces }, locale: node?.language ?? null };
  });

  if (!paths || paths?.length === 0) {
    return `ERROR: failed fetch for all pages slugs`;
  }

  return paths;
}

export async function getSitemapNodes(
  client: SanityClient,
): Promise<string | sharedTypes.CtaLinkType[]> {
  const nodes = (await client.fetch(getSitemapAllNodesQuery)) || [];

  if (!nodes || nodes?.length === 0) {
    return `ERROR: failed fetch for all sitemap nodes`;
  }

  return nodes;
}

export async function getMenus(client: SanityClient): Promise<sharedTypes.NavbarType> {
  return (await client.fetch(sharedQueries.getMenus)) || [];
}

export async function getNodeFullPath(client: SanityClient, nodeRef: string): Promise<string> {
  const fetchedNode =
    (await client.fetch(getParentWithNodeByIdFiltered, {
      id: nodeRef,
    })) || null;
  if (!fetchedNode) {
    throw new Error(`ERROR: Node with ref [${nodeRef}] not found`);
  }
  if (fetchedNode?.isRoot) {
    return '';
  }

  const fullPath = [fetchedNode?.slug];

  let currentNode = {
    isRoot: fetchedNode?.isRoot,
    slug: fetchedNode?.slug,
    slugParentRef: fetchedNode?.slugParentRef,
  };

  while (!currentNode?.isRoot) {
    const parent =
      (await client.fetch(getParentWithNodeByIdFiltered, {
        id: currentNode?.slugParentRef,
      })) || null;

    if (!parent) {
      throw new Error(`ERROR: Parent node not found for [${currentNode?.slug}]`);
    }

    currentNode = parent;
    if (!parent?.isRoot) {
      fullPath.push(parent?.slug);
    }
  }
  fullPath.reverse();

  return fullPath.join('/');
}

export async function getNode(
  client: SanityClient,
  slug: string[],
  locale: string,
): Promise<sharedTypes.NodeTypeWithLocale | string> {
  try {
    const queryObject: {
      queries: { translations: string; fallback: string; node: string };
      params: { language?: string; slug?: string; id?: string };
    } = {
      queries: {
        translations: getParentWithRootNodeTranslations,
        fallback: getParentWithRootNode,
        node: getParentWithNodeById,
      },
      params: {
        language: locale,
      },
    };

    const isRoot = slug.length === 0;

    if (!isRoot) {
      queryObject.queries.translations = getParentWithNodeBySlugTranslations;
      queryObject.params.slug = slug[slug?.length - 1];
      queryObject.queries.fallback = getParentWithNodeBySlug;
    }

    // fetch the node's translation metadata based on slug
    let node = null;
    node =
      ((await client.fetch(
        queryObject.queries.translations,
        queryObject.params,
      )) as sharedTypes.NodeOnlyWithTranslationMetadataType) || null;

    // if there is no translation metadata, fetch the node based on the fallback query
    // otherwise, continue as usual
    if (!node || !node.translationMetadata) {
      node = (await client.fetch(queryObject.queries.fallback, queryObject.params)) || null;

      // if the fallback fails, return an error
      if (!node) {
        return isRoot
          ? `ERROR: Root node not found`
          : `ERROR: Node with slug [${slug[slug?.length - 1]}] not found`;
      }

      const fullPath = await getNodeFullPath(client, node._id);
      const requestedPath = slug.join('/');

      // IMPORTANT: if the requested path is different from the full path, we need to redirect
      // DO NOT, change the ternary operator, unless you know what you are doing
      return {
        value: node,
        shouldBeRedirectedTo: requestedPath !== fullPath ? fullPath : '',
      };
    }

    // ensure the node exists in the requested locale
    const nodeWithCorrectLocale =
      node.translationMetadata.translations?.find((t) => {
        return t?.value?.language === locale;
      })?.value ?? null;

    if (!nodeWithCorrectLocale) {
      return isRoot
        ? `ERROR: Root node not found`
        : `ERROR: Node with slug [${slug[slug?.length - 1]}] not found`;
    }

    // assign the correct _id to the query params
    queryObject.params = {
      ...queryObject.params,
      id: nodeWithCorrectLocale._id,
    };

    // fetch the node based on the correct _id
    node = (await client.fetch(queryObject.queries.node, queryObject.params)) || null;

    if (!node) {
      return isRoot
        ? `ERROR: Root node not found`
        : `ERROR: Node with slug [${slug[slug?.length - 1]}] not found`;
    }

    const fullPath = await getNodeFullPath(client, node._id);
    const requestedPath = slug.join('/');

    // IMPORTANT: if the requested path is different from the full path, we need to redirect
    // DO NOT, change the ternary operator, unless you know what you are doing
    return {
      value: node,
      shouldBeRedirectedTo: requestedPath !== fullPath ? fullPath : '',
    };
  } catch (error) {
    console.error(error);
    return `ERROR: failed fetch for node with slug: ${slug ? slug[slug?.length - 1] : null}`;
  }
}
