import { fileAssetFields } from '@lib/queries/queries';
import { ctaButtonItemSchemaFields } from '@schemas/ctaButtonItem/ctaButtonItem.queries';
import { groq } from 'next-sanity';

export const HomeHeroBlockQuery = groq`
  _type == "HomeHeroBlock" => {
    ...,
     image {
        ${fileAssetFields}
      },
    ctaButton {
        ${ctaButtonItemSchemaFields}
      },
    memberCtaButton {
        ${ctaButtonItemSchemaFields}
      },
  }
`;
