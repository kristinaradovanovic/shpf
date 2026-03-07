import { getClient } from '@lib/sanity/sanity.client';
import { NodeTypeUnion } from '@lib/types/types';
import { slugCleaner, slugMaxLength, slugValidateLowercase } from '@lib/utils/slug-utils';
import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { getParentWithNodeExistsBySlug, getParentWithNodeLanguageById } from './node.queries';
import { ComputedFullUrlComponent } from './CustomComponents/ComputedFullUrlComponent';

export const schemaName = 'node';
const schemaTitle = 'Node';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: DocumentTextIcon as any,
  type: 'object',
  groups: [
    { title: 'Main', name: 'main', default: true },
    { title: 'SEO', name: 'seo' },
    { title: 'Settings', name: 'settings' },
  ],
  fieldsets: [
    {
      title: 'Header and Footer',
      name: 'headerAndFooterSet',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) =>
        rule.custom((value) => {
          return value ? true : 'Title is required';
        }),
      group: ['main'],
    }),
    defineField({
      name: 'computedFullUrl',
      title: 'Computed Full URL',
      type: 'string',
      readOnly: true,
      description: 'The full URL of the page, including the domain and slug.',
      components: {
        input: ComputedFullUrlComponent,
      },
      group: ['main'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'node.title',
        maxLength: slugMaxLength,
        slugify: slugCleaner,
        isUnique: () => {
          return true;
        },
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          const parent = context?.document as unknown as NodeTypeUnion;
          if (parent?.isRoot && value) {
            return `Slug must be empty for root ${parent?._type}`;
          }
          if (!parent?.isRoot && !value) {
            return 'Slug is required';
          }
          const slugRegex = /^[a-z0-9-]+$/;
          if (!parent?.isRoot && value && !slugRegex.test(value?.current || '')) {
            return 'Slug can only contain alphanumeric characters and hyphens.';
          }

          if (value) {
            if (!parent.language) {
              return 'Locale is required';
            }
            const client = getClient();
            // check if there is a document with the same slug and same locale
            const documentID = parent._id.split('drafts.')[1] || parent._id;
            const fetchedNode = (await client.fetch(getParentWithNodeExistsBySlug, {
              slug: value.current,
              language: parent.language,
            })) as NodeTypeUnion;

            if (!fetchedNode) {
              return slugValidateLowercase(value);
            }

            if (fetchedNode._id && fetchedNode._id !== documentID) {
              return 'Slug must be unique';
            }
          }
          return slugValidateLowercase(value);
        }),
      hidden: (context) => context?.document?.isRoot as boolean,
      description: 'The slug is used to generate the URL. It should be unique and descriptive.',
      group: ['main'],
    }),
    defineField({
      name: 'slugParent',
      title: 'Slug parent',
      type: 'reference',
      to: [
        {
          type: 'page',
        },
      ],
      weak: true,
      description:
        'The parent to use for the slug. If this is the root page, the slug will not be used.',
      options: {
        filter: async ({ document }) => {
          return {
            filter: '_id != $id && defined(language)',
            params: {
              id: document._id,
            },
          };
        },
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          const parent = context?.document as {
            isRoot?: boolean;
            language?: string;
            _id: string;
          };

          if (!parent.language) {
            return 'Locale is required';
          }

          if (parent.isRoot) {
            return true;
          }

          if (!value) {
            return 'Slug parent is required';
          }

          const documentID = parent._id.split('drafts.')[1] || parent._id;
          if (value._ref === documentID) {
            return 'Slug parent cannot be the same as the current document';
          }

          const client = getClient();
          const fetchedLanguage = (await client.fetch(getParentWithNodeLanguageById, {
            id: value._ref,
          })) as string;

          if (!fetchedLanguage) {
            return 'Slug parent must have a locale';
          }

          if (fetchedLanguage !== parent.language) {
            return 'Slug parent must be in the same locale';
          }

          return true;
        }),
      hidden: (context) => context?.document?.isRoot as boolean,
      group: ['main'],
    }),
    defineField({
      name: 'includeInSitemap',
      title: 'Include in Sitemap?',
      type: 'boolean',
      description: 'Include in the sitemap?',
      initialValue: true,
      validation: (rule) => rule.required(),
      group: ['seo'],
    }),
    defineField({
      name: 'includeInSearchEngines',
      title: 'Include in Search Engines?',
      type: 'boolean',
      description: 'Include in search engines?',
      initialValue: true,
      validation: (rule) => rule.required(),
      group: ['seo'],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title that will appear in search engine results.',
      group: ['seo'],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'The description that will appear in search engine results.',
      group: ['seo'],
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keyword' }] }],
      description: 'The keywords that will appear in search engine results.',
      group: ['seo'],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The image that will appear when the page is shared on social media.',
      group: ['seo'],
    }),
    defineField({
      name: 'ogImageAlt',
      title: 'Open Graph Image Alt',
      type: 'string',
      description:
        'The alt text for the image that will appear when the page is shared on social media.',
      group: ['seo'],
    }),
    defineField({
      name: 'showHeader',
      title: 'Show Header',
      type: 'boolean',
      description: 'Should the header be shown?',
      initialValue: true,
      validation: (rule) => rule.required(),
      group: ['settings'],
      fieldset: 'headerAndFooterSet',
    }),
    defineField({
      name: 'showFooter',
      title: 'Show Footer',
      type: 'boolean',
      description: 'Should the footer be shown?',
      initialValue: true,
      validation: (rule) => rule.required(),
      group: ['settings'],
      fieldset: 'headerAndFooterSet',
    }),
  ],
});
