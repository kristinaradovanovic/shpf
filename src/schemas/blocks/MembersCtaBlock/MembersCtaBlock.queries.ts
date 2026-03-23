import { groq } from 'next-sanity';
import { teamMemberSchemaFields } from '@/schemas/teamMember/teamMember.queries';
import { ctaButtonItemSchemaFields } from '@/schemas/ctaButtonItem/ctaButtonItem.queries';

export const MembersCtaBlockQuery = groq`
	_type == "MembersCtaBlock" => {
		...,
		ctaButton {
			${ctaButtonItemSchemaFields}
		},
		teamMembers[]-> {
			${teamMemberSchemaFields}
		}
	}
`;
