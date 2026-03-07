import { UlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'contactDetails';
const schemaTitle = 'Contact Details';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: UlistIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'contactTitle',
      title: 'Contact title',
      type: 'string',
      description: 'The title of the contact section in the footer',
      placeholder: 'Contact',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle of the contact section in the footer',
      placeholder: 'Frågor & svar',
    }),
    defineField({
      name: 'whistleblower',
      title: 'Whistleblower Link',
      type: 'externalLink',
      description: 'Länk till visselblåsarfunktion',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email().error('Please provide a valid email address.'),
      description: 'The email address in the footer',
      placeholder: 'name@example.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'The phone number in the footer',
      placeholder: '+46 123 456 789',
    }),
    defineField({
      name: 'addressTitle',
      title: 'Address title',
      type: 'string',
      description: 'A title for the address in the footer',
      placeholder: 'Besöksadress',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'The address in the footer',
      placeholder: '1234 Street Name',
    }),
    defineField({
      name: 'postal',
      title: 'Postal info',
      type: 'string',
      description: 'The postal info in the footer',
      placeholder: '123 45 Stockholm, Sweden',
    }),
  ],
});

//
