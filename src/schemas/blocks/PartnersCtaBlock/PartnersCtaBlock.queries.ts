import { groq } from 'next-sanity';
import { partnerItemSchemaFields } from '@/schemas/partnerItem/partnerItem.queries';
import { ctaButtonItemSchemaFields } from '@/schemas/ctaButtonItem/ctaButtonItem.queries';

export const PartnersCtaBlockQuery = groq`
	_type == "PartnersCtaBlock" => {
		...,
		ctaButton {
			${ctaButtonItemSchemaFields}
		},
		"partners": *[_type == "partnerItem"] | order(_createdAt asc) {
			${partnerItemSchemaFields}
		}
	}
`;
