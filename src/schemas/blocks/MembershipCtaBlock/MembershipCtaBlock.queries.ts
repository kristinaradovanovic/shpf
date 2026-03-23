import { groq } from 'next-sanity';
import { highlightCardSchemaFields } from '@/schemas/highlightCard/highlightCard.queries';
import { ctaButtonItemSchemaFields } from '@/schemas/ctaButtonItem/ctaButtonItem.queries';

export const MembershipCtaBlockQuery = groq`
	_type == "MembershipCtaBlock" => {
		...,
		ctaButton {
			${ctaButtonItemSchemaFields}
		},
		highlightCards[] {
			${highlightCardSchemaFields}
		}
	}
`;
