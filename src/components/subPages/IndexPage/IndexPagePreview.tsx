// Note: This is the preview component for the IndexPage component
import { Settings } from '@schemas/settings/settings.types';
import { useLiveQuery } from 'next-sanity/preview';
import IndexPage from './IndexPage';
import { settingsFields } from '@schemas/settings/settings.queries';
import { stegaClean } from '@sanity/client/stega';
// import Footer from '@components/Footer/Footer';
import Seo from '@components/Seo/Seo';
// import Header from '@components/Header/Header';
import { NodeTypeUnion } from '@lib/types/types';
import { getParentWithNodeBySlug, getParentWithRootNode } from '@schemas/node/node.queries';
import { HeaderSchemaType } from '@schemas/header/header.types';
import { FooterSchemaType } from '@schemas/footer/footer.types';
import { IndexPagePreviewProps } from './IndexPagePreview.types';

export default function IndexPagePreview({
  settings,
  node,
  header,
  footer,
  params,
  locale,
}: IndexPagePreviewProps) {
  const [settingsPreview] = useLiveQuery<Settings>(settings as Settings, settingsFields);

  const slug = params?.slug ? params.slug[params.slug.length - 1] : null;
  const queryObject = {
    query: slug ? getParentWithNodeBySlug : getParentWithRootNode,
    params: slug ? { slug, language: locale } : { language: locale },
  };

  const [nodePreview] = useLiveQuery<NodeTypeUnion>(
    node as NodeTypeUnion,
    queryObject.query,
    queryObject.params,
  );

  // IMPORTANT, see: https://www.sanity.io/docs/stega
  const cleanedNode = stegaClean(nodePreview) as NodeTypeUnion;
  const cleanedHeader = stegaClean(header) as HeaderSchemaType;
  const cleanedFooter = stegaClean(footer) as FooterSchemaType;
  const cleanedSettings = stegaClean(settingsPreview) as Settings;

  return (
    <>
      <Seo
        node={cleanedNode}
        settings={cleanedSettings}
      />
      {/*       <Header
        header={cleanedHeader}
        showHeader={cleanedNode?.node?.showHeader as boolean}
        settings={cleanedSettings}
      /> */}
      <IndexPage node={cleanedNode} />
      {/*       <Footer
        footer={cleanedFooter}
        showFooter={cleanedNode?.node?.showFooter as boolean}
        settings={cleanedSettings as Settings}
      /> */}
    </>
  );
}
