import { groq } from 'next-sanity';
import { fileAssetFields } from '@/lib/queries/queries';

export const SplitContentBlockQuery = groq`
	_type == "SplitContentBlock" => {
		...,
		 image {
				${fileAssetFields}
		},
	}
`;
