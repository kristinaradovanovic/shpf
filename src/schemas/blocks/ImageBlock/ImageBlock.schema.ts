import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ImagePreviewComponent } from '@schemas/SanityComponents';
import { imageField } from '@lib/fields/image-field/image-field';

const blockName = 'ImageBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageItem',
          title: 'Image Item',
          fields: [
            defineField(imageField({ image: { required: true }, alt: { required: true } })),
            defineField({
              name: 'horizontalAlignment',
              title: 'Horizontal Alignment',
              type: 'string',
              initialValue: 'center',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'verticalAlignment',
              title: 'Vertical Alignment',
              type: 'string',
              initialValue: 'center',
              options: {
                list: [
                  { title: 'Top', value: 'top' },
                  { title: 'Center', value: 'center' },
                  { title: 'Bottom', value: 'bottom' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: {
              image: 'image',
              imageName: 'image.asset.originalFilename',
              alt: 'image.alt',
            },
            prepare(selection) {
              const { image, imageName, alt } = selection;
              return {
                title: imageName,
                subtitle: alt,
                media: image,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(2),
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
