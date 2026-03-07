import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'videoObject';
const schemaTitle = 'Video';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: PlayIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Title to help editors find the video, will not be displayed on the website',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'An optional short descriptive text about the video',
      type: 'string',
    }),
    {
      name: 'videoType',
      type: 'string',
      title: 'Video Type',
      options: {
        list: [
          { title: 'video', value: 'video' },
          { title: 'embedded', value: 'embeddedVideoUrl' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    },
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'video',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string };
          if (parent?.videoType === 'video' && !value) {
            return 'An uploaded video file is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'embeddedVideoUrl',
      title: 'Embed Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.videoType !== 'embeddedVideoUrl',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string };
          if (parent?.videoType === 'embedded' && !value) {
            return 'A youtube or vimeo URL is required';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
    },
    prepare({ title, videoType }) {
      let subtitle;

      if (videoType === 'embeddedVideoUrl') {
        subtitle = 'Embedded Video';
      }

      if (videoType === 'video') {
        subtitle = 'Uploaded Video';
      }

      return {
        title: title || 'Untitled Video',
        subtitle,
        icon: PlayIcon,
      };
    },
  },
});
