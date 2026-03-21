import { groq } from 'next-sanity';
import { partnerItemSchemaFields } from '@/schemas/partnerItem/partnerItem.queries';

export const PartnersCtaBlockQuery = groq`
	_type == "PartnersCtaBlock" => {
		...,
		"partners": *[_type == "partnerItem"] | order(_createdAt asc) {
			${partnerItemSchemaFields}
		}
	}
`;
