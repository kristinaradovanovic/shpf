import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ImagePreviewComponent } from '@schemas/SanityComponents';

const blockName = 'SplitContentBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTagline',
      title: 'Section tagline',
      description:
        'A short, descriptive text that appears above the title to provide context or highlight the content of the card.',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description for the CTA hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          placeholder: 'This image shows...',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        },
      ],
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: '_type',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        media: ImagePreviewComponent({
          src: `/block-previews/${blockName}.webp`,
          alt: `${blockName} Preview`,
        }),
      };
    },
  },
});
