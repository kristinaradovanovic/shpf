import { groq } from 'next-sanity';
import { contentItemSchemaFields } from '@schemas/contentItem/contentItem.queries';

export const SplitContentWithCtaBlockQuery = groq`
	_type == "SplitContentWithCtaBlock" => {
		...,
		contentItems[] {
			${contentItemSchemaFields}
		}
	}
`;
