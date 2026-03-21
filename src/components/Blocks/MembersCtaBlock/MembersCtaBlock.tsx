import { MembersCtaBlockSchemaType } from '@/schemas/blocks/MembersCtaBlock/MembersCtaBlock.types';
import React from 'react';

const MembersCtaBlock = ({
  sectionTagline,
  title,
  description,
  teamMembers,
  ctaButton,
}: MembersCtaBlockSchemaType) => {
  console.log('MembersCtaBlock data:', {
    sectionTagline,
    title,
    description,
    teamMembers,
    ctaButton,
  });
  return <div></div>;
};

export default MembersCtaBlock;
