import { faqItemSchemaFields } from '@schemas/faqItem/faqItem.queries';
import { groq } from 'next-sanity';

export const faqGroupItemSchemaFields = groq`
    ...,
    items[] {
        ${faqItemSchemaFields}
    }
`;
