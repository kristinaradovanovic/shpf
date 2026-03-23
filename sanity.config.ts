'use client';
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { apiVersion, dataset, projectId } from '@lib/sanity/sanity.api';
import { schemas } from '@lib/sanity/sanity.schemas';
import { pageStructureChildPages, settingsPlugin, settingsStructure } from '@plugins/settings';
import { debugSecrets } from '@sanity/preview-url-secret/sanity-plugin-debug-secrets';
import { visionTool } from '@sanity/vision';
import settingsSchema from '@schemas/settings/settings.schema';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { previewDocumentNode } from '@plugins/previewPane/previewPane';
import { documentInternationalization } from '@sanity/document-internationalization';
import { createImprovedAction } from '@lib/actions/ComputeFullUrlAction';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Sanity Studio';
const subtitle = 'Content Studio';
const LOCALIZED_SCHEMAS = ['page', 'header', 'footer'];
const CONTENT_LANGUAGES = [
  { id: 'sv', title: 'Swedish' },
  { id: 'en', title: 'English' },
];

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  document: {
    actions: (prev) =>
      prev.map((originalAction) =>
        originalAction.action === 'publish' ? createImprovedAction(originalAction) : originalAction,
      ),
  },
  releases: {
    enabled: false,
  },
  schema: {
    templates: (prev) => {
      // Construct custom initial value templates for localized schemas
      const customInitialValueTemplates = [
        ...CONTENT_LANGUAGES.map((language) => {
          return {
            id: `page-${language.id}`,
            title: `Page - ${language.title}`,
            schemaType: 'page',
            value: {
              language: language.id,
            },
          };
        }),
        ...pageStructureChildPages.map((template) => {
          return {
            id: template.initialValueTemplate,
            title: `Page Child - ${template.title}`,
            schemaType: template.schemaType,
            parameters: [
              {
                name: 'parentId',
                type: 'string',
              },
              {
                name: 'language',
                type: 'string',
              },
            ],
            value: (parameters: any) => ({
              language: parameters.language || 'sv',
              node: {
                slugParent: {
                  _type: 'reference',
                  _ref: parameters.parentId,
                  _weak: true,
                },
              },
            }),
          };
        }),
      ];

      // Keep default templates, and add language-aware templates for direct page creation.
      const filteredPrev = prev;

      return [...filteredPrev, ...customInitialValueTemplates];
    },
    // If you want more content types, you can add them to this array
    types: schemas,
  },
  plugins: [
    structureTool({
      structure: settingsStructure(settingsSchema),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    // presentationTool({
    //   locate,
    //   previewUrl: {
    //     previewMode: {
    //       enable: DRAFT_MODE_ROUTE,
    //     },
    //   },
    // }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: 'sv', title: 'Swedish' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: LOCALIZED_SCHEMAS,
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsSchema.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Media library
    media(),
    // Hierarchy
    // hierarchicalDocumentList(),
    // The remaining plugins are only loaded in dev mode
    process.env.NODE_ENV !== 'production' && (debugSecrets() as any),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    }),
  ],
  tools: (prev, context) => {
    const isAdmin =
      context.currentUser && context.currentUser.roles.find(({ name }) => name === 'administrator');
    return isAdmin ? prev : prev.filter((tool) => tool.name !== 'vision');
  },
  subtitle,
});
