import { DRAFT_MODE_ROUTE } from '@lib/sanity/sanity.api';
import { getClient } from '@lib/sanity/sanity.client';
import { CtaLinkType, NodeTypeUnion } from '@lib/types/types';
import { extractLinkOrSlug } from '@lib/utils/link-utils';
import { getParentWithNodeByIdSimple } from '@schemas/node/node.queries';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { IframeOptions, Iframe } from 'sanity-plugin-iframe-pane';
import { DefaultDocumentNodeResolver, StructureBuilder } from 'sanity/structure';

async function previewSlugHandler(document: any) {
  const client = getClient(undefined, 'raw');

  if (!document) {
    return new Error('Missing document');
  }

  if (!document?.node) {
    return new Error('Missing document node');
  }

  if (!document?.language) {
    return new Error('Missing document locale');
  }

  if (document.hasOwnProperty('isIndex') && !document.isIndex) {
    return new Error('Page is not an index page');
  }

  const fetched = (await client.fetch(getParentWithNodeByIdSimple, {
    id: document._id,
  })) as CtaLinkType;

  if (!fetched) {
    return new Error('Document not found');
  }

  const fullSlug = extractLinkOrSlug(fetched);

  if (!fullSlug) {
    return new Error('Document slug not found');
  }

  return fullSlug === '/' ? '/' : `/${fullSlug}`;
}

const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document: any) => {
      if (!document) {
        return new Error('Missing document');
      }
      return previewSlugHandler(document);
    },
    draftMode: DRAFT_MODE_ROUTE,
  },
  reload: { button: true },
} satisfies IframeOptions;

/**
 * Display a default document with preview and incoming references.
 * @param S - StructureBuilder instance
 * @param schemaType - The schema type of the document.
 * @param documentId - The ID of the document.
 * @returns A document structure with a preview and incoming references.
 */
export function documentWithPreview(S: StructureBuilder, schemaType: string, documentId: string) {
  return S.document()
    .id(documentId)
    .schemaType(schemaType)
    .views([
      S.view.form(),
      S.view.component(Iframe).options(iframeOptions).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[references($id)]`,
          params: ({ document }: { document: { displayed: NodeTypeUnion } }) => {
            // we don't have to worry about undefined parameters,
            // as the plugin will handle them and show an appropriate message
            return { id: document.displayed._id };
          },
          options: { perspective: 'raw' },
        })
        .title('Incoming References'),
    ]);
}

/**
 * Used by the preview pane plugin to resolve the default document node.
 * @param allowedPreviews - An array of schema types that are allowed to have previews.
 * @returns A function that resolves the default document node with previews.
 */
export const previewDefaultDocumentNodeResolver = (
  allowedPreviews: string[],
): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    if (!allowedPreviews.includes(schemaType as (typeof allowedPreviews)[number])) {
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[references($id)]`,
            params: ({ document }: { document: { displayed: NodeTypeUnion } }) => {
              // we don't have to worry about undefined parameters,
              // as the plugin will handle them and show an appropriate message
              return { id: document.displayed._id };
            },
            options: { perspective: 'raw' },
          })
          .title('Incoming References'),
      ]);
    }
    return S.document().views([
      S.view.form(),
      S.view.component(Iframe).options(iframeOptions).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[references($id)]`,
          params: ({ document }: { document: { displayed: NodeTypeUnion } }) => {
            // we don't have to worry about undefined parameters,
            // as the plugin will handle them and show an appropriate message
            return { id: document.displayed._id };
          },
          options: { perspective: 'raw' },
        })
        .title('Incoming References'),
    ]);
  };
};
