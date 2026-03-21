import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ImagePreviewComponent } from '@schemas/SanityComponents';

const blockName = 'SplitContentWithCtaBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'contentItems',
      title: 'Content Items',
      type: 'array',
      of: [{ type: 'contentItem' }],
      validation: (rule) => rule.required().min(1),
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
