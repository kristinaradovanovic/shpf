import { fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const bulletPointSchemaFields = groq`
    ...,
     icon {
        ${fileAssetFields}
      }
`;
