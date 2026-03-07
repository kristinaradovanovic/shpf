import { headerItemSchemaFields } from '@schemas/headerItem/headerItem.queries';
import { groq } from 'next-sanity';

export const headerSchemaFields = groq`
    ...,
    headerItems[] {
      ${headerItemSchemaFields}
    }
`;
