import { imageField } from '@lib/fields/image-field/image-field';
import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'imageCustom';
const schemaTitle = 'Image Custom';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: SquareIcon as any,
  type: 'object',
  fields: [defineField(imageField({ image: { required: false }, alt: { required: false } }))],
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
});
