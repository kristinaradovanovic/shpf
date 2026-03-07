import { ctaLinkFields } from '@lib/queries/queries';
import { getClient } from '@lib/sanity/sanity.client';
import { extractLinkOrSlug } from '@lib/utils/link-utils';
import { groq } from 'next-sanity';
import { DocumentActionComponent, DocumentActionProps, useDocumentOperation } from 'sanity';

export function createImprovedAction(originalPublishAction: DocumentActionComponent) {
  const ComputeFullUrlAction = (props: DocumentActionProps) => {
    const originalResult = originalPublishAction(props);
    const fieldToPatch = 'node.computedFullUrl';
    const { patch } = useDocumentOperation(props.id, props.type);
    if (!originalResult) {
      return null;
    }
    const client = getClient(undefined, 'previewDrafts');
    const currentPageQuery = groq`*[_id == $docId && defined(node)][0]{${ctaLinkFields}}`;
    const docId = props.id;
    return {
      ...originalResult,
      onHandle: async () => {
        // Add custom functionality
        let data;
        try {
          data = await client.fetch(currentPageQuery, {
            docId: docId,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        if (!data) {
          console.error('No data found for the given document ID:', docId);
          if (typeof originalResult.onHandle === 'function') {
            originalResult.onHandle();
          }
          return;
        }

        const url = extractLinkOrSlug(data);

        if (!url) {
          console.error('No URL found in the fetched data:', data);
          if (typeof originalResult.onHandle === 'function') {
            originalResult.onHandle();
          }
          return;
        }

        const BASE_URL = process.env.NEXT_PUBLIC_URL ?? '';
        const SANITIZED_URL = url.startsWith('/') ? url : `/${url}`;
        const fullUrl = BASE_URL ? `${BASE_URL}${SANITIZED_URL}` : SANITIZED_URL;

        // Execute patch to update the document
        patch.execute([{ set: { [fieldToPatch]: fullUrl } }]);

        // then delegate to original handler
        if (typeof originalResult.onHandle === 'function') {
          originalResult.onHandle();
        }
      },
    };
  };
  return ComputeFullUrlAction;
}
