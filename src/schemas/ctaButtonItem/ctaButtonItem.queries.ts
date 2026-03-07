import { ctaLinkFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const ctaButtonItemSchemaFields = groq`
    ...,
    ctaPage->{
      ${ctaLinkFields}
    }     
`;
