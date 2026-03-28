import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ImagePreviewComponent } from '@schemas/SanityComponents';

const blockName = 'RichTextBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTagline',
      title: 'Section tagline',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'richTextContent',
      title: 'Rich text content',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'linkType',
                    type: 'string',
                    title: 'Link type',
                    options: {
                      list: [
                        { title: 'External', value: 'external' },
                        { title: 'Email', value: 'mail' },
                      ],
                      layout: 'radio',
                    },
                    validation: (rule: any) => rule.required(),
                  },
                  {
                    name: 'url',
                    type: 'url',
                    title: 'External URL',
                    hidden: ({ parent }: { parent?: { linkType?: string } }) =>
                      parent?.linkType !== 'external',
                    validation: (rule: any) =>
                      rule.custom((value: string | undefined, context: any) => {
                        const parent = context.parent as { linkType?: string };
                        if (parent?.linkType === 'external' && !value) {
                          return 'An external URL is required';
                        }
                        return true;
                      }),
                  },
                  defineField({
                    name: 'emailAddress',
                    title: 'Email address',
                    type: 'string',
                    hidden: ({ parent }) => parent?.linkType !== 'mail',
                    validation: (rule: any) =>
                      rule.custom((value: string | undefined, context: any) => {
                        const parent = context.parent as { linkType?: string };
                        if (parent?.linkType === 'mail' && !value) {
                          return 'An email address is required';
                        }
                        return true;
                      }),
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || blockName,
        media: ImagePreviewComponent({
          src: `/block-previews/${blockName}.webp`,
          alt: `${blockName} Preview`,
        }),
      };
    },
  },
});
