import type { PageSchemaType } from '@schemas/page/page.types';

type FilterResolution = {
  effectiveNode: PageSchemaType;
  filterPages: NonNullable<PageSchemaType['filterPages']>;
  defaultFilterPage?: NonNullable<PageSchemaType['filterPages']>[number];
  activeFilterPage?: NonNullable<PageSchemaType['filterPages']>[number];
  shouldRedirectToDefault: boolean;
};

export function resolveFilterPageContent(
  node: PageSchemaType,
  pageQueryParam?: string,
): FilterResolution {
  if (node.pageType !== 'filter') {
    return {
      effectiveNode: node,
      filterPages: [],
      shouldRedirectToDefault: false,
    };
  }

  const filterPages = node.filterPages || [];

  if (!filterPages.length) {
    return {
      effectiveNode: {
        ...node,
        blocks: [],
      },
      filterPages,
      shouldRedirectToDefault: false,
    };
  }

  const defaultFilterPage =
    (node.defaultFilterPage
      ? filterPages.find((page) => page._id === node.defaultFilterPage?._id)
      : undefined) || filterPages[0];

  const matchedFilterPage = pageQueryParam
    ? filterPages.find((page) => page.slug === pageQueryParam)
    : undefined;

  const activeFilterPage = matchedFilterPage || defaultFilterPage;

  const effectiveNode: PageSchemaType = {
    ...node,
    blocks: activeFilterPage?.modules || [],
    node: {
      ...node.node,
      title: activeFilterPage?.title || node.node?.title,
      metaTitle: activeFilterPage?.seo?.metaTitle || node.node?.metaTitle,
      metaDescription: activeFilterPage?.seo?.metaDescription || node.node?.metaDescription,
      metaKeywords: activeFilterPage?.seo?.metaKeywords || node.node?.metaKeywords,
      includeInSearchEngines:
        activeFilterPage?.seo?.includeInSearchEngines ?? node.node?.includeInSearchEngines,
      ogImage: (activeFilterPage?.seo?.ogImage?.asset as any) || node.node?.ogImage,
      ogImageAlt: activeFilterPage?.seo?.ogImageAlt || node.node?.ogImageAlt,
    },
  };

  return {
    effectiveNode,
    filterPages,
    defaultFilterPage,
    activeFilterPage,
    shouldRedirectToDefault: !pageQueryParam || !matchedFilterPage,
  };
}
