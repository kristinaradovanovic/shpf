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
import SplitContentWithCtaBlockSchema from '../blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';
import MembersCtaBlockSchema from '../blocks/MembersCtaBlock/MembersCtaBlock.schema';

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
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: HomeHeroBlockSchema.name },
        { type: SplitContentWithCtaBlockSchema.name },
        { type: MembersCtaBlockSchema.name },
      ],
      description: 'The modular blocks that make up this page.',
      hidden: ({ parent }) => !parent?.isIndex,
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
