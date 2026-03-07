import { fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const quoteFields = groq` _type == "quote" => {
  ...,
  author-> {
    ...,
    image {
      ${fileAssetFields}
    }
  },
  image {
    ${fileAssetFields}
  }
}`;
