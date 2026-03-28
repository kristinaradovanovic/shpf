import Seo from '@components/Seo/Seo';
import HeroWithSubpagesBlock from '@components/Blocks/HeroWithSubpagesBlock/HeroWithSubpagesBlock';
import IndexPage from '@components/subPages/IndexPage/IndexPage';
import IndexPagePreview from '@components/subPages/IndexPage/IndexPagePreview';
import { resolveFilterPageContent } from '@lib/helpers/filter-page.helpers';
import { readToken } from '@lib/sanity/sanity.api';
import { getAllPagesSlugs, getClient, getNode } from '@lib/sanity/sanity.client';
import type { NodeTypeUnion, NodeTypeWithLocale } from '@lib/types/types';
import type { SharedPageProps } from '@pages/_app';
import { FooterSchemaType } from '@/schemas/footer/footer.types';
import { HeaderSchemaType } from '@schemas/header/header.types';
import type { GetStaticProps } from 'next';
import Header from '@/components/pageStructure/Header/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
interface PageProps extends SharedPageProps {
  header: HeaderSchemaType;
  footer: FooterSchemaType;
  node: NodeTypeUnion;
  params: any;
  locale?: string;
  locales?: string[];
  defaultLocale?: string;
}

interface Query {
  [key: string]: string;
}

export default function Page({ draftMode, params, node, header, footer, locale }: PageProps) {
  const router = useRouter();
  const pageQueryParam = typeof router.query.page === 'string' ? router.query.page : undefined;
  const {
    effectiveNode,
    filterPages,
    defaultFilterPage,
    activeFilterPage,
    shouldRedirectToDefault,
  } = resolveFilterPageContent(node, pageQueryParam);

  useEffect(() => {
    if (!router.isReady || !defaultFilterPage?.slug || !shouldRedirectToDefault || draftMode) {
      return;
    }

    const currentPath = router.asPath.split('?')[0];
    void router.replace(`${currentPath}?page=${defaultFilterPage.slug}`, undefined, {
      shallow: true,
    });
  }, [defaultFilterPage?.slug, draftMode, router, shouldRedirectToDefault]);

  if (draftMode) {
    // Handles all the different page types inside the preview component
    return (
      <IndexPagePreview
        node={effectiveNode}
        header={header}
        footer={footer}
        params={params}
        locale={locale}
      />
    );
  }

  // if a page has isIndex set to false, it should not be rendered
  // posts does not have this field, so they should pass
  if (effectiveNode?.isIndex === false) {
    return null;
  }

  const shouldRenderFilterHero =
    effectiveNode?.pageType === 'filter' && filterPages.length > 0 && activeFilterPage;

  const basePath = router.asPath.split('?')[0];

  return (
    <>
      <Seo node={effectiveNode} />
      <Header {...header} />
      {shouldRenderFilterHero && (
        <HeroWithSubpagesBlock
          hero={effectiveNode.heroWithSubpages}
          tabs={filterPages}
          activeFilterPage={activeFilterPage}
          activeSlug={activeFilterPage?.slug}
          basePath={basePath}
        />
      )}
      <IndexPage node={effectiveNode} />
      {/*     <Footer
        footer={footer}
        showFooter={node?.node?.showFooter as boolean}
        settings={settings}
      /> */}
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params, locale, locales } = ctx;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  // assuming that slug is a string array because of optional catch-all route
  const slug = (params?.slug as unknown as string[]) ?? [];

  // if the locale is not in the list of supported locales, return 404
  if (locale && locales && !locales?.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const [node]: [NodeTypeWithLocale | string] = await Promise.all([
    getNode(client, slug ?? [], locale ?? ''),
  ]);

  if (typeof node === 'string') {
    return {
      notFound: true,
    };
  }

  if (
    process.env.npm_lifecycle_event !== 'build' &&
    node?.shouldBeRedirectedTo &&
    node?.shouldBeRedirectedTo !== slug.join('/')
  ) {
    return {
      redirect: {
        destination: '/' + locale + '/' + node.shouldBeRedirectedTo,
        permanent: false,
      },
    };
  }

  return {
    props: {
      header: node.value.header,
      footer: node.value.footer,
      node: node.value,
      draftMode,
      params: params,
      locale,
      token: draftMode ? readToken : '',
    },
    ...(process.env.NODE_ENV !== 'production'
      ? {
          revalidate: 1, // Revalidate quickly in development to reflect CMS edits
        }
      : {}),
  };
};

export const getStaticPaths = async () => {
  const client = getClient();
  const allPageSlugs = await getAllPagesSlugs(client);

  if (typeof allPageSlugs === 'string') {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  return {
    paths: process.env.NODE_ENV === 'production' ? allPageSlugs : [],
    fallback: 'blocking',
  };
};
