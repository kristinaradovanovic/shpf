// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { pageStructureChildPages } from '@plugins/settings';
import { previewDefaultDocumentNodeResolver } from './preview-utils';

const allowedPreviews = pageStructureChildPages?.map((page) => page.schemaType);

/**
 * Used by the preview pane plugin to resolve the default document node.
 */
export const previewDocumentNode = () => {
  return previewDefaultDocumentNodeResolver(allowedPreviews);
};
