import { imageField } from '@lib/fields/image-field/image-field';
import { EditIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'case';
const schemaTitle = 'Case';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: EditIcon as any,
  type: 'document',
  groups: [
    { name: 'heroContent', title: 'Hero Content' },
    { name: 'blocks', title: 'Blocks' },
  ],
  fields: [
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      title: 'Locale',
      type: 'string',
      readOnly: true,
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
      name: 'node',
      title: schemaTitle,
      type: 'node',
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'text',
      description: `Title of the case that will be used as headline on the Case's page.`,
      group: 'heroContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroMediaType',
      title: 'Hero Media Type',
      description: `The selected media type will be displayed as hero media on the Case's page. If no media type is selected, the image field will be used by default.`,
      type: 'string',
      options: {
        list: ['image', 'video'],
      },
      initialValue: 'image',
      group: 'heroContent',
    }),
    defineField(
      imageField({
        image: {
          required: true,
          imageDescription:
            'The image to be used in the Case View Block and optionally as hero image on the case page',
        },
      }),
    ),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      description: `Optional video to be displayed as hero media on the Case page. Select if an image or video should be displayed as hero cover under 'Hero Media Type'`,
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'text',
      description: 'Credits for the case that will be displayed on the Case page.',
      group: 'heroContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expertises',
      title: 'Expertises',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'expertise' } }],
      description: 'The expertises related to the case',
      group: 'heroContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [] /* .sort((a, b) => a.type.localeCompare(b.type)) */,
      description: `The modular blocks that make up this case's page.`,
      group: 'blocks',
      hidden: ({ parent }) => parent?.isExternal,
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) => {
                return `${process.env.NEXT_PUBLIC_URL}/block-previews/${schemaTypeName}.webp`;
              },
            },
            { name: 'list' },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'node.title',
    },
  },
});
