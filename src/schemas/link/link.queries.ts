import { ctaLinkFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const linkSchemaFields = groq`
    ...,
      page-> {
        ${ctaLinkFields}
      }
`;
