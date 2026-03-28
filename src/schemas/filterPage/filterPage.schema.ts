import { slugCleaner, slugMaxLength, slugValidateLowercase } from '@lib/utils/slug-utils';
import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import HomeHeroBlockSchema from '../blocks/HomeHeroBlock/HomeHeroBlock.schema';
import SplitContentWithCtaBlockSchema from '../blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';
import MembersCtaBlockSchema from '../blocks/MembersCtaBlock/MembersCtaBlock.schema';
import PartnersCtaBlockSchema from '../blocks/PartnersCtaBlock/PartnersCtaBlock.schema';
import MembershipCtaBlockSchema from '../blocks/MembershipCtaBlock/MembershipCtaBlock.schema';
import RichTextBlockSchema from '../blocks/RichTextBlock/RichTextBlock.schema';
import SplitContentBlockSchema from '../blocks/SplitContentBlock/SplitContentBlock.schema';
import ImageBlockSchema from '../blocks/ImageBlock/ImageBlock.schema';

export const schemaName = 'filterPage';
export const schemaTitle = 'Filter Page';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  description: 'A reusable subpage that can be attached to a filter-type page.',
  icon: DocumentIcon as any,
  type: 'document',
  groups: [
    { title: 'Main', name: 'main', default: true },
    { title: 'SEO', name: 'seo' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: slugMaxLength,
        slugify: slugCleaner,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          return slugValidateLowercase(value);
        }),
      description: 'Used in the main page query param (?page=<slug>).',
      group: 'main',
    }),
    defineField({
      name: 'tabLabel',
      title: 'Tab Label',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Label displayed in the hero tab selector.',
      group: 'main',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          placeholder: 'This image shows...',
        },
      ],
      options: { hotspot: true },
      description: 'Image shown in the main hero when this filter page is active.',
      group: 'main',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: HomeHeroBlockSchema.name },
        { type: SplitContentWithCtaBlockSchema.name },
        { type: MembersCtaBlockSchema.name },
        { type: PartnersCtaBlockSchema.name },
        { type: MembershipCtaBlockSchema.name },
        { type: RichTextBlockSchema.name },
        { type: ImageBlockSchema.name },
        { type: SplitContentBlockSchema.name },
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'list',
            },
            {
              name: 'grid',
              previewImageUrl(schemaTypeName) {
                return `${process.env.NEXT_PUBLIC_URL}/block-previews/${schemaTypeName}.webp`;
              },
            },
          ],
        },
      },
      group: 'main',
    }),
    defineField({
      name: 'seo',
      title: 'SEO (Optional)',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'includeInSearchEngines',
          title: 'Include in Search Engines?',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'keyword' }] }],
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'ogImageAlt',
          title: 'Open Graph Image Alt',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      tabLabel: 'tabLabel',
    },
    prepare(selection) {
      const { title, slug, tabLabel } = selection;
      return {
        title,
        subtitle: `${tabLabel || 'No tab label'} | ${slug || 'no-slug'}`,
      };
    },
  },
});
