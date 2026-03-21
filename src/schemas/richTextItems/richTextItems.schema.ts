import { backgroundColors } from '@lib/styles/variables/colors';
import { LinkIcon, PlayIcon, TagIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const schemaName = 'richTextItems';
const schemaTitle = 'Rich Text Items';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: TagIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'richTextItems',
      title: 'Rich text',
      type: 'array',
      description: 'Add content here.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            // { title: 'Ingress', value: 'ingress', component:  },
            { title: 'rubrik 2', value: 'h2' },
            { title: 'rubrik 3', value: 'h3' },
            { title: 'rubrik 4', value: 'h4' },
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

            // annotations: [
            //   {
            //     name: 'quoteAnnotation',
            //     title: 'Quote',
            //     type: 'object',
            //     fields: [
            //       {
            //         name: 'quoteText',
            //         title: 'Quote text',
            //         type: 'text',
            //       },
            //       { name: 'quoteAuthor', title: 'Quote author', type: 'string' },
            //     ],
            //   },
            // ],
          },
        },
        {
          type: 'richTextCtaButton',
          title: 'CTA Button',
          options: {
            inline: true,
          },
          // components: {
          //   preview: ,
          // },
        },
        defineArrayMember({
          name: 'video',
          title: 'video',
          type: 'object',
          fields: [
            defineField({
              name: 'videoReference',
              title: 'Video',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
                defineField({
                  name: 'videoType',
                  title: 'Video Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Uploaded', value: 'video' },
                      { title: 'Embedded', value: 'embeddedVideoUrl' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'video',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'video',
                  title: 'Video File',
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                  hidden: ({ parent }) => parent?.videoType !== 'video',
                }),
                defineField({
                  name: 'embeddedVideoUrl',
                  title: 'Embedded Video URL',
                  type: 'url',
                  hidden: ({ parent }) => parent?.videoType !== 'embeddedVideoUrl',
                }),
              ],
            }),
            defineField({
              name: 'showDescription',
              title: 'Show Description?',
              description:
                'Turn the toggle on to display the descriptive text below the video on the website',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'shouldAutoplay',
              title: 'Should the video autoplay?',
              description:
                'Turn the toggle on to autoplay the video when the page loads. If autoplay is on, the video will be muted.',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'onMute',
              title: 'Should the video be muted?',
              description:
                'Turn the toggle on to have the video muted. This will only work if autoplay is turned off.',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.shouldAutoplay === true,
            }),
          ],
          preview: {
            select: {
              title: 'videoReference.title',
              videoType: 'videoReference.videoType',
              shouldAutoplay: 'shouldAutoplay',
              onMute: 'onMute',
            },
            prepare({ title, videoType, shouldAutoplay, onMute }) {
              const videoTypeTitle = videoType === 'video' ? 'Uploaded Video' : 'Embedded Video';
              const autoplayTitle = shouldAutoplay ? ' | With autoplay ' : ' | No autoplay ';
              const onMuteTitle = onMute || shouldAutoplay ? ' | Muted ' : ' | Not muted ';

              const subtitle = videoTypeTitle + autoplayTitle + onMuteTitle;

              return {
                title: title || 'Untitled Video',
                subtitle: subtitle,
                icon: PlayIcon,
              };
            },
          },
        }),
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
        defineArrayMember({
          type: 'object',
          name: 'infoBox',
          title: 'Information Box',
          fields: [
            defineField({
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              options: {
                list: Object.keys(backgroundColors),
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Information Box',
              };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'spacingDivider',
          title: 'Spacing divider',
          fields: [
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              initialValue: 'small',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Spacing divider',
              };
            },
          },
        }),
      ],
    }),
  ],
});
