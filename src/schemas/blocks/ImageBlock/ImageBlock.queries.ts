import { groq } from 'next-sanity';
import { fileAssetFields } from '@/lib/queries/queries';

export const ImageBlockQuery = groq`
  _type == "ImageBlock" => {
    ...,
    images[] {
      _key,
      horizontalAlignment,
      verticalAlignment,
      image {
        ${fileAssetFields}
        alt,
        hotspot,
        crop
      }
    }
  }
`;
