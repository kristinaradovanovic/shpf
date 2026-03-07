import { EnvelopeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'newsletter';
const schemaTitle = 'Newsletter';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: EnvelopeIcon as any,
  type: 'object',
  groups: [
    {
      name: 'newsletterMain',
      title: 'Main',
    },
    {
      name: 'newsletterApiConfig',
      title: 'API Config',
    },
  ],
  fields: [
    defineField({
      name: 'showNewsletter',
      title: 'Show newsletter',
      type: 'boolean',
      description: 'Show newsletter form in the footer.',
      initialValue: false,
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of newsletter module.',
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'inputPlaceholder',
      title: 'Input placeholder',
      type: 'string',
      description: 'The placeholder text for the input field.',
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'confirmationMessage',
      title: 'Confirmation message',
      type: 'string',
      description: 'The confirmation message to show when the user subscribes.',
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error message',
      type: 'string',
      description: 'The error message to show when the user fails to subscribe.',
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'invalidInputMessage',
      title: 'Invalid input message',
      type: 'string',
      description: 'The message to show when the user enters an invalid email.',
      group: ['newsletterMain'],
    }),
    defineField({
      name: 'apiKey',
      title: 'API key',
      type: 'string',
      description: 'The API key for the third party newsletter service.',
      group: ['newsletterApiConfig'],
    }),
    defineField({
      name: 'serverRegion',
      title: 'Server Region',
      type: 'string',
      description: 'The server region for the third party newsletter service.',
      group: ['newsletterApiConfig'],
    }),
    defineField({
      name: 'audienceId',
      title: 'Audience ID',
      type: 'string',
      description: 'The audience ID for the third party newsletter service.',
      group: ['newsletterApiConfig'],
    }),
  ],
});
