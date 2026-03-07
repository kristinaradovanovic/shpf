// import OpenGraphInput from '@components/Seo/OpenGraphInput';
import { defaultDataLayerName } from '@lib/constants/constants';
import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'settings';
const schemaTitle = 'Settings';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: CogIcon as any,
  type: 'document',
  preview: { select: { title: 'title', subtitle: 'description' } },
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'icons',
      title: 'Icons',
    },
    {
      name: 'analytics',
      title: 'Analytics',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The title of the website. Used for SEO and other purposes.',
      group: ['general'],
    }),
    defineField({
      name: 'iconDark',
      title: 'Icon (Dark)',
      type: 'file',
      options: {
        accept: 'image/svg+xml',
      },
      description: 'The icon to be used to on the website.',
      group: ['icons'],
    }),
    defineField({
      name: 'iconLight',
      title: 'Icon (Light)',
      type: 'file',
      options: {
        accept: 'image/svg+xml',
      },
      description: 'The icon to be used to on the website.',
      group: ['icons'],
    }),
    defineField({
      name: 'gtmID',
      title: 'GTM ID',
      type: 'string',
      description: 'The Google Tag Manager ID.',
      group: ['analytics'],
    }),
    defineField({
      name: 'gtmDataLayerName',
      title: 'GTM Data Layer Name',
      type: 'string',
      description: `The name of the data layer for Google Tag Manager. Defaults to ${defaultDataLayerName}.`,
      initialValue: defaultDataLayerName,
      group: ['analytics'],
    }),
    defineField({
      name: 'gaID',
      title: 'GA ID',
      type: 'string',
      description: 'The Google Analytics ID.',
      group: ['analytics'],
    }),
    defineField({
      name: 'gaDataLayerName',
      title: 'GA Data Layer Name',
      type: 'string',
      description: `The name of the data layer for Google Analytics. Defaults to ${defaultDataLayerName}.`,
      initialValue: defaultDataLayerName,
      group: ['analytics'],
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The default Open Graph image to be used on the website.',
      group: ['seo'],
    }),
    defineField({
      name: 'defaultOgImageAlt',
      title: 'Default Open Graph Image Alt',
      type: 'string',
      description: 'The alt text for the default Open Graph image.',
      group: ['seo'],
    }),
  ],
});
