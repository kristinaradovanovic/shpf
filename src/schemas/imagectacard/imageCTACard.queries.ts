import { fileAssetFields } from '@lib/queries/queries';
import { ctaButtonItemSchemaFields } from '@schemas/ctaButtonItem/ctaButtonItem.queries';
import { groq } from 'next-sanity';

export const imageCtaCardSchemaFields = groq`
  _type == "imageCtaCard" => {
    ...,
    ctaButton {
      ${ctaButtonItemSchemaFields}
    },
    image {
      ${fileAssetFields}
    }
  }
`;
