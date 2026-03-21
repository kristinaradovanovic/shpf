import Seo from '@components/Seo/Seo';
import IndexPage from '@components/subPages/IndexPage/IndexPage';
import IndexPagePreview from '@components/subPages/IndexPage/IndexPagePreview';
import { readToken } from '@lib/sanity/sanity.api';
import { getAllPagesSlugs, getClient, getNode } from '@lib/sanity/sanity.client';
import type { NodeTypeUnion, NodeTypeWithLocale } from '@lib/types/types';
import type { SharedPageProps } from '@pages/_app';
import { FooterSchemaType } from '@/schemas/footer/footer.types';
import { HeaderSchemaType } from '@schemas/header/header.types';
import type { GetStaticProps } from 'next';
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
  if (draftMode) {
    // Handles all the different page types inside the preview component
    return (
      <IndexPagePreview
        node={node}
        header={header}
        footer={footer}
        params={params}
        locale={locale}
      />
    );
  }

  // if a page has isIndex set to false, it should not be rendered
  // posts does not have this field, so they should pass
  if (node?.isIndex === false) {
    return null;
  }

  return (
    <>
      <Seo node={node} />
      {/* <Header /> */}
      <p>Home page</p>
      <IndexPage node={node} />
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
          revalidate: 60, // Revalidate every 60 seconds in development
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
