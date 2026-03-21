import { fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';
import { ctaButtonItemSchemaFields } from '../ctaButtonItem/ctaButtonItem.queries';

export const contentItemSchemaFields = groq`
  ...,
  image {
    ${fileAssetFields}
  },
  ctaButton {
    ${ctaButtonItemSchemaFields}
  }
`;
