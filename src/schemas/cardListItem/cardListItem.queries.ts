import { fileAssetFields } from '@lib/queries/queries';
import { ctaButtonItemSchemaFields } from '@schemas/ctaButtonItem/ctaButtonItem.queries';
import { groq } from 'next-sanity';

export const cardListItemSchemaFields = groq`
  ...,
  image {
    ${fileAssetFields}
  },
  ctaButtons[] {
    ${ctaButtonItemSchemaFields}
  }
`;
