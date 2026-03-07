import { groq } from 'next-sanity';

export const titleWithKeywordsItemFields = groq` _type == "titleWithKeywordsItem" => {
  ...
}`;
