import { groq } from 'next-sanity';
import { highlightCardSchemaFields } from '@/schemas/highlightCard/highlightCard.queries';

export const MembershipCtaBlockQuery = groq`
	_type == "MembersCtaBlock" => {
		...,
		highlightCards[]-> {
			${highlightCardSchemaFields}
		}
	}
`;
