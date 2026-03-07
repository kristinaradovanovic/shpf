import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'navSocial';
const schemaTitle = 'Footer Social';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: LinkIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'navSocialsTitle',
      title: 'Socials title',
      type: 'string',
      description: 'The title of the social section',
      placeholder: 'Follow us',
    }),
    defineField({
      name: 'isTitleHidden',
      title: 'Hide title?',
      type: 'boolean',
      description: 'Hide the title of the nav socials?',
      initialValue: false,
    }),
    defineField({
      name: 'socialLinkItems',
      title: 'Social Link Items',
      type: 'array',
      of: [{ type: 'externalLink' }],
    }),
  ],
});
