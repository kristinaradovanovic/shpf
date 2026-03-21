import { CTAButtonItemSchemaType } from '@/schemas/ctaButtonItem/ctaButtonItem.types';
import { TeamMemberSchemaType } from '@/schemas/teamMember/teamMember.types';
import type { SchemaType } from '@lib/types/types';

export interface MembersCtaBlockSchemaType extends SchemaType {
  sectionTagline?: string;
  title: string;
  description: string;
  teamMembers: TeamMemberSchemaType[];
  ctaButton?: CTAButtonItemSchemaType;
}
