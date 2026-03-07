import { ctaLinkFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const headerItemSchemaFields = groq`
    ...,
    page->{
        ${ctaLinkFields}
    },
    sublinks[]->{
        ${ctaLinkFields}
    }
`;
