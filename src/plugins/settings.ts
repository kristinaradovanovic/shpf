/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

// import { createDeskHierarchy } from '@sanity/hierarchical-document-list';
import { getClient } from '@lib/sanity/sanity.client';
import { groq } from 'next-sanity';
import { definePlugin, type DocumentDefinition } from 'sanity';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import { documentWithPreview } from './previewPane/preview-utils';
import { DocumentIcon, FolderIcon, AddDocumentIcon, ThListIcon, SchemaIcon } from '@sanity/icons';

// the amount of children beneath the root node
const PAGE_STRUCTURE_MAX_DEPTH = 4;

const FALLBACK_SCHEMA_TYPE = 'page';
const CONTENT_LANGUAGES = [
  { id: 'sv', title: 'Swedish' },
  { id: 'en', title: 'English' },
];

const pageStructureTitles = {
  CONTENT_OF: 'Contents of',
  CHILDREN: 'Subpages',
  CREATE_NEW_PAGE: 'New subpage (+)',
  PICK_PAGE_TYPE: 'Pick subpage type:',
};

const pageStructureHomeObject = {
  title: 'Page',
  schemaType: 'page',
  icon: DocumentIcon,
};

export const pageStructureChildPages = [
  {
    title: 'Page',
    schemaType: 'page',
    initialValueTemplate: 'page-child-page',
    icon: DocumentIcon,
  },
];

const allowedPreviews = pageStructureChildPages.map((page) => page.schemaType);

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type);
        }

        return prev;
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        // Document types that should not be duplicated or deleted

        // const staticDocumentSchemaTypes = [];

        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate');
        }

        // if (staticDocumentSchemaTypes.includes(schemaType)) {
        //   return prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete');
        // }

        return prev;
      },
    },
  };
});

function buildRecursiveChildren(
  client: any,
  S: StructureBuilder,
  documentId: string,
  depth: number,
  maxDepth: number,
  schemaType: string,
  language: string,
): any {
  if (depth > maxDepth) {
    return documentWithPreview(S, schemaType, documentId);
  }

  // Get the dynamic child page object based on the schemaType
  const dynamicChildPageObject = pageStructureChildPages.find(
    (page) => page.schemaType === schemaType,
  );

  return S.list()
    .title(pageStructureTitles.CONTENT_OF + ` ${dynamicChildPageObject?.title}`)
    .items([
      S.listItem()
        .title(dynamicChildPageObject?.title as string)
        .icon(dynamicChildPageObject?.icon as any)
        .child(documentWithPreview(S, dynamicChildPageObject?.schemaType as string, documentId)),
      S.listItem()
        .title(pageStructureTitles.CHILDREN)
        .icon(FolderIcon as any)
        .child(
          S.documentList()
            .title(pageStructureTitles.CHILDREN)
            .filter(
              groq`defined(node) && node.slugParent._ref == $documentId && language == $language`,
            )
            .apiVersion('2023-06-21')
            .params({ documentId, language })
            .child(async (childDocumentId: string) => {
              const doc = (await client.fetch(groq`*[_id == $childDocumentId][0]{_type}`, {
                childDocumentId,
              })) as { _type: string };

              // We fallback to schemaType FALLBACK_SCHEMA_TYPE if the document type is not found
              return buildRecursiveChildren(
                client,
                S,
                childDocumentId,
                depth + 1,
                maxDepth,
                doc?._type || FALLBACK_SCHEMA_TYPE,
                language,
              );
            }),
        ),
      S.divider(),
      S.listItem()
        .title(pageStructureTitles.CREATE_NEW_PAGE)
        .icon(AddDocumentIcon as any)
        .child(
          S.list()
            .title(pageStructureTitles.PICK_PAGE_TYPE)
            .items([
              ...pageStructureChildPages.map((childPage) => {
                return S.listItem()
                  .title(childPage.title)
                  .icon(childPage.icon as any)
                  .child(
                    S.defaultDocument({
                      documentId: crypto.randomUUID(),
                      schemaType: childPage.schemaType,
                    }).initialValueTemplate(childPage.initialValueTemplate, {
                      parentId: documentId,
                      language,
                    }),
                  );
              }),
            ]),
        ),
    ]);
}

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Individual" is handled.
export const settingsStructure = (typeDef: DocumentDefinition): StructureResolver => {
  const client = getClient(undefined, 'raw');

  return (S) => {
    // The `Settings` root list item
    const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(typeDef.title as string)
        .icon(typeDef.icon as any)
        .child(S.editor().id(typeDef.name).schemaType(typeDef.name).documentId(typeDef.name));

    return S.list()
      .title('Studio')
      .items([
        S.divider().title('Settings'),
        settingsListItem,
        S.divider().title('Pages'),
        S.listItem()
          .title('Pages')
          .icon(DocumentIcon as any)
          .child(
            S.list()
              .title('Pages')
              .items(
                CONTENT_LANGUAGES.map((language) =>
                  S.listItem()
                    .title(language.title)
                    .icon(FolderIcon as any)
                    .child(
                      S.list()
                        .title(`${language.title} Pages`)
                        .items([
                          S.listItem()
                            .title('Pages')
                            .icon(DocumentIcon as any)
                            .child(
                              S.documentList()
                                .title(`${language.title} Pages`)
                                .filter(groq`_type == $type && language == $language`)
                                .apiVersion('2023-06-21')
                                .params({ type: 'page', language: language.id })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem(`page-${language.id}`),
                                ]),
                            ),
                          S.listItem()
                            .title('Page Structure')
                            .icon(SchemaIcon as any)
                            .child(
                              S.documentList()
                                .title(`${language.title} Page Structure`)
                                .filter(groq`_type == $type && isRoot && language == $language`)
                                .apiVersion('2023-06-21')
                                .params({
                                  type: pageStructureHomeObject.schemaType,
                                  language: language.id,
                                })
                                .schemaType(pageStructureHomeObject.schemaType)
                                .child((homePageId) => {
                                  return buildRecursiveChildren(
                                    client,
                                    S,
                                    homePageId,
                                    1,
                                    PAGE_STRUCTURE_MAX_DEPTH,
                                    pageStructureHomeObject.schemaType,
                                    language.id,
                                  );
                                }),
                            ),
                        ]),
                    ),
                ),
              ),
          ),
        S.divider().title('Layout Components'),
        S.listItem()
          .title('Layout Components')
          .icon(ThListIcon as any)
          .child(
            S.list()
              .title('Layout Components')
              .items(
                CONTENT_LANGUAGES.map((language) =>
                  S.listItem()
                    .title(language.title)
                    .icon(FolderIcon as any)
                    .child(
                      S.list()
                        .title(`${language.title} Layout Components`)
                        .items([
                          S.listItem()
                            .title('Header')
                            .icon(ThListIcon as any)
                            .child(
                              S.documentList()
                                .title(`${language.title} Header`)
                                .filter(groq`_type == "header" && language == $language`)
                                .apiVersion('2023-06-21')
                                .params({ language: language.id }),
                            ),
                          S.listItem()
                            .title('Footer')
                            .icon(ThListIcon as any)
                            .child(
                              S.documentList()
                                .title(`${language.title} Footer`)
                                .filter(groq`_type == "footer" && language == $language`)
                                .apiVersion('2023-06-21')
                                .params({ language: language.id }),
                            ),
                        ]),
                    ),
                ),
              ),
          ),
        S.divider().title('Content blocks'),
        S.listItem()
          .title('Content blocks')
          .icon(FolderIcon as any)
          .child(
            S.list()
              .title('Content blocks')
              .items(
                CONTENT_LANGUAGES.map((language) =>
                  S.listItem()
                    .title(language.title)
                    .icon(FolderIcon as any)
                    .child(
                      S.list()
                        .title(`${language.title} Content blocks`)
                        .items([
                          S.listItem()
                            .title('Team Members')
                            .icon(FolderIcon as any)
                            .child(S.documentTypeList('teamMember').title('Team Members')),
                          S.listItem()
                            .title('Hotel Members')
                            .icon(FolderIcon as any)
                            .child(S.list().title('Hotel Members').items([])),
                          S.listItem()
                            .title('Partners')
                            .icon(FolderIcon as any)
                            .child(S.documentTypeList('partnerItem').title('Partners')),
                        ]),
                    ),
                ),
              ),
          ),
        S.divider().title('SEO'),
        S.listItem()
          .title('SEO')
          .icon(FolderIcon as any)
          .child(
            S.list()
              .title('SEO')
              .items([S.documentTypeListItem('keyword'), S.documentTypeListItem('redirect')]),
          ),
      ]);
  };
};
