import { headerItemSchemaFields } from '@schemas/headerItem/headerItem.queries';
import { ctaButtonItemSchemaFields } from '@schemas/ctaButtonItem/ctaButtonItem.queries';
import { groq } from 'next-sanity';

export const headerSchemaFields = groq`
    ...,
    ctaButton {
      ${ctaButtonItemSchemaFields}
    },
    headerItems[] {
      ${headerItemSchemaFields}
    }
`;
