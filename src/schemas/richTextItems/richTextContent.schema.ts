import { LinkIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading big', value: 'h2' },
        { title: 'Heading medium', value: 'h3' },
        { title: 'Heading small', value: 'h4' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Box', value: 'box' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon as any,
            fields: [
              {
                name: 'linkType',
                type: 'string',
                title: 'Link type',
                options: {
                  list: [
                    { title: 'Internal', value: 'internal' },
                    { title: 'External', value: 'external' },
                    { title: 'Mail', value: 'mail' },
                    { title: 'Phone', value: 'phone' },
                  ],
                  layout: 'radio',
                },
              },
              {
                name: 'reference',
                type: 'reference',
                to: [{ type: 'page' }],
                title: 'Internal page reference',
                hidden: ({ parent }: { parent?: { linkType?: string } }) =>
                  parent?.linkType !== 'internal',
                validation: (rule) =>
                  rule.custom((value, context) => {
                    const parent = context.parent as { linkType?: string };
                    if (parent?.linkType === 'internal' && !value) {
                      return 'An internal reference is required';
                    }
                    return true;
                  }),
              },
              {
                name: 'url',
                type: 'url',
                title: 'External URL',
                hidden: ({ parent }) => parent?.linkType !== 'external',
                validation: (rule) =>
                  rule.custom((value, context) => {
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
                validation: (rule) =>
                  rule.custom((value, context) => {
                    const parent = context.parent as { linkType?: string };
                    if (parent?.linkType === 'mail' && !value) {
                      return 'An email address is required';
                    }
                    return true;
                  }),
              }),
              defineField({
                name: 'phoneNumber',
                title: 'Phone number',
                type: 'string',
                hidden: ({ parent }) => parent?.linkType !== 'phone',
                validation: (rule) =>
                  rule.custom((value, context) => {
                    const parent = context.parent as { linkType?: string };
                    if (parent?.linkType === 'phone' && !value) {
                      return 'A phone number is required';
                    }
                    return true;
                  }),
              }),
            ],
          },
        ],
      },
    },
    defineArrayMember({
      type: 'image',
      title: 'Image',
      name: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Image Description',
          type: 'string',
          description:
            'A short description of the image for accessibility purposes. This will be displayed below the image.',
        }),
      ],
      preview: {
        select: {
          title: 'asset.originalFilename',
          subtitle: 'alt',
          imageUrl: 'asset.url',
        },
      },
    }),
  ],
});
