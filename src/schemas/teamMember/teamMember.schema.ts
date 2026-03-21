import { imageField } from '@lib/fields/image-field/image-field';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'teamMember';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField(imageField({ image: { required: false }, alt: { required: false } })),
    defineField({
      name: 'nameAndLastName',
      title: 'Name and Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hotel',
      title: 'Hotel',
      description: 'The hotel the team member works at, e.g. "Hotel California".',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'The location of the hotel, e.g. "Stockholm, Sweden".',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
});
