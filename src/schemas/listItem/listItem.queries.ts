import { linkItemSchemaFields } from '@schemas/linkItem/linkItem.queries';
import { groq } from 'next-sanity';

export const listItemSchemaFields = groq`
  ...,
  items[] {
    ${linkItemSchemaFields}
  }
`;
