import { ctaLinkFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const navItemSchemaFields = groq`
    ...,
    pages[]->{
        ${ctaLinkFields}
    }
`;
