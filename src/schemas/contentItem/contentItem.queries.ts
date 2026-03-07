import { fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const contentItemSchemaFields = groq`
  ...,
  icon {
    ${fileAssetFields}  
  }
`;
