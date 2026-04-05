import { groq } from 'next-sanity';

export const TitleAndDescriptionBlockQuery = groq`
  _type == "TitleAndDescriptionBlock" => {
    ...
  }
`;
