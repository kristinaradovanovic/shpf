import { groq } from 'next-sanity';
import { highlightCardSchemaFields } from '@/schemas/highlightCard/highlightCard.queries';

export const PillarsGridBlockQuery = groq`
  _type == "PillarsGridBlock" => {
    ...,
    highlightCards[] {
      ${highlightCardSchemaFields}
    }
  }
`;
