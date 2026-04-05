import { getClient } from '@lib/sanity/sanity.client';
import { DocumentIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { groq } from 'next-sanity';
import { defineField, defineType } from 'sanity';
import {
  TranslationMetadataEntryType,
  TranslationMetadataIDType,
  TranslationMetadataType,
} from '@lib/types/types';
import { getTranslationsByID, getTranslationsRefByID } from '@schemas/node/node.queries';
import HomeHeroBlockSchema from '../blocks/HomeHeroBlock/HomeHeroBlock.schema';
import HeroWithSubpagesBlockSchema from '../blocks/HeroWithSubpagesBlock/HeroWithSubpagesBlock.schema';
import SplitContentWithCtaBlockSchema from '../blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';
import MembersCtaBlockSchema from '../blocks/MembersCtaBlock/MembersCtaBlock.schema';
import PartnersCtaBlockSchema from '../blocks/PartnersCtaBlock/PartnersCtaBlock.schema';
import MembershipCtaBlockSchema from '../blocks/MembershipCtaBlock/MembershipCtaBlock.schema';
import RichTextBlockSchema from '../blocks/RichTextBlock/RichTextBlock.schema';
import SplitContentBlockSchema from '../blocks/SplitContentBlock/SplitContentBlock.schema';
import ImageBlockSchema from '../blocks/ImageBlock/ImageBlock.schema';
import TitleAndDescriptionBlockSchema from '../blocks/TitleAndDescriptionBlock/TitleAndDescriptionBlock.schema';
import PillarsGridBlockSchema from '../blocks/PillarsGridBlock/PillarsGridBlock.schema';

export const schemaName = 'page';
export const schemaTitle = 'Page';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  description: 'A page is a document that can contain blocks of content.',
  icon: DocumentIcon as any,
  type: 'document',
  fields: [
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      title: 'Locale',
      type: 'string',
      /*  readOnly: true, */
      // hidden: true,
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return 'Language translation must be set, use the [Translations] button';
          }
          return true;
        }),
    }),
    defineField({
      name: 'isRoot',
      title: 'Is Root?',
      type: 'boolean',
      initialValue: false,
      description: 'Is this the root page?',
      validation: (rule) =>
        rule.custom(async (value, context) => {
          const client = getClient();
          const rawDocumentID = context?.document?._id;
          const documentID = rawDocumentID?.split('drafts.')[1] || rawDocumentID;

          if (!value) {
            // If the isRoot field of this current document is not set to true, it must be checked if there is already a root page within the same translation.metadata object
            const translations = (await client.fetch(getTranslationsByID, {
              id: documentID,
            })) as TranslationMetadataType;
            if (!translations) {
              return true;
            }

            const populatedTranslations = translations.filter(
              (translation: TranslationMetadataEntryType) => {
                return translation.value !== null;
              },
            );

            // check to see if at least one of the translations has isRoot set to true
            const hasRoot = populatedTranslations.some(
              (translation: TranslationMetadataEntryType) => {
                return translation.value.isRoot;
              },
            );

            if (hasRoot) {
              return 'At least one translation has isRoot set to true, this document must also be set to true';
            }
            return true;
          }
          // If the isRoot field of this current document is set to true, it must be checked if there is already a root page within the same translation.metadata object
          const query = groq`*[_type == "page" && isRoot == true && _id != $id && _id != "drafts.$id"][0]`;
          const rootPage = await client.fetch(query, { id: documentID });
          if (!rootPage) {
            return true;
          }
          const rootPageTranslationsID = (await client.fetch(getTranslationsRefByID, {
            id: rootPage._id,
          })) as TranslationMetadataIDType;
          const currentDocumentTranslationsID = (await client.fetch(getTranslationsRefByID, {
            id: documentID,
          })) as TranslationMetadataIDType;

          if (rootPageTranslationsID !== currentDocumentTranslationsID) {
            return 'There is already a root page group, this document must be apart of the same group';
          }

          return true;
        }),
    }),
    defineField({
      name: 'node',
      title: schemaTitle,
      type: 'node',
    }),
    defineField({
      name: 'isIndex',
      title: 'Is this an index page?',
      type: 'boolean',
      initialValue: true,
      description:
        'This should be ON by default. Only disable this, if the page is only meant to hold child pages, but not be a page itself.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Filter', value: 'filter' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroWithSubpages',
      title: 'Hero With Subpages',
      type: HeroWithSubpagesBlockSchema.name,
      hidden: ({ parent }) => parent?.pageType !== 'filter',
    }),
    defineField({
      name: 'filterPages',
      title: 'Filter Pages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'filterPage' }, { type: 'page' }] }],
      hidden: ({ parent }) => parent?.pageType !== 'filter',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.document as { pageType?: string };
          if (parent?.pageType !== 'filter') {
            return true;
          }

          if (!value || value.length === 0) {
            return 'At least one filter page is required for filter page type';
          }

          return true;
        }),
    }),
    defineField({
      name: 'defaultFilterPage',
      title: 'Default Filter Page',
      type: 'reference',
      to: [{ type: 'filterPage' }, { type: 'page' }],
      hidden: ({ parent }) => parent?.pageType !== 'filter',
      options: {
        disableNew: true,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.document as {
            pageType?: string;
            filterPages?: { _ref: string }[];
          };

          if (parent?.pageType !== 'filter') {
            return true;
          }

          if (!value?._ref) {
            return 'Default filter page is required for filter page type';
          }

          const hasReference = parent?.filterPages?.some((pageRef) => pageRef._ref === value._ref);

          if (!hasReference) {
            return 'Default filter page must be one of the selected filter pages';
          }

          return true;
        }),
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: HomeHeroBlockSchema.name },
        { type: SplitContentWithCtaBlockSchema.name },
        { type: MembersCtaBlockSchema.name },
        { type: PartnersCtaBlockSchema.name },
        { type: MembershipCtaBlockSchema.name },
        { type: RichTextBlockSchema.name },
        { type: ImageBlockSchema.name },
        { type: SplitContentBlockSchema.name },
        { type: TitleAndDescriptionBlockSchema.name },
        { type: PillarsGridBlockSchema.name },
      ],
      description: 'The modular blocks that make up this page.',
      hidden: ({ parent }) => !parent?.isIndex || parent?.pageType === 'filter',
      options: {
        insertMenu: {
          views: [
            {
              name: 'list',
            },
            {
              name: 'grid',
              previewImageUrl(schemaTypeName) {
                return `${process.env.NEXT_PUBLIC_URL}/block-previews/${schemaTypeName}.webp`;
              },
            },
          ],
        },
      },
    }),
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title A-Z',
      by: [{ field: 'node.title', direction: 'asc' }],
    },
    {
      name: 'titleDesc',
      title: 'Title Z-A',
      by: [{ field: 'node.title', direction: 'desc' }],
    },
    {
      name: 'Language',
      title: 'Language',
      by: [{ field: 'language', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'node.title',
      blocks: 'blocks',
      updatedAt: '_updatedAt',
    },
    prepare(selection) {
      const { title, blocks, updatedAt } = selection;
      return {
        title: title,
        subtitle: `blocks: ${blocks ? blocks.length : 0} / updated: ${format(parseISO(updatedAt), 'LLL d, yyyy')}`,
      };
    },
  },
});
