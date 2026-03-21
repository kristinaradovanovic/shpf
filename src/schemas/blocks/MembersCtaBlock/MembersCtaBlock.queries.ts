import { groq } from 'next-sanity';
import { teamMemberSchemaFields } from '@/schemas/teamMember/teamMember.queries';

export const MembersCtaBlockQuery = groq`
	_type == "MembersCtaBlock" => {
		...,
		teamMembers[] {
			${teamMemberSchemaFields}
		}
	}
`;
