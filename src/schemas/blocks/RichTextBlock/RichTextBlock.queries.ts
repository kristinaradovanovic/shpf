import { groq } from 'next-sanity';

export const RichTextBlockQuery = groq`
  _type == "RichTextBlock" => {
    ...
  }
`;
