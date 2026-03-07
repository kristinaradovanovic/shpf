import { ctaLinkFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const linkItemSchemaFields = groq`
    ...,
    "icon":icon.asset->,
    ctaPage->{
      ${ctaLinkFields}
    }
`;
