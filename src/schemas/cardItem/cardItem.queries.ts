import { fileAssetFields } from '@lib/queries/queries';
import { ctaButtonItemSchemaFields } from '@schemas/ctaButtonItem/ctaButtonItem.queries';
import { groq } from 'next-sanity';

export const cardItemSchemaFields = groq`
  ...,
  image {
    ${fileAssetFields}
  },
  ctaButton {
    ${ctaButtonItemSchemaFields}
  }
`;
