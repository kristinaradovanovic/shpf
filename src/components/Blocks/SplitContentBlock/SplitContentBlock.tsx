import { SplitContentBlockSchemaType } from '@/schemas/blocks/SplitContentBlock/SplitContentBlock.types';
import React from 'react';

const SplitContentBlock = ({
  sectionTagline,
  title,
  description,
  image,
}: SplitContentBlockSchemaType) => {
  console.log('Rendering SplitContentBlock with props:', {
    sectionTagline,
    title,
    description,
    image,
  });
  return <div></div>;
};

export default SplitContentBlock;
