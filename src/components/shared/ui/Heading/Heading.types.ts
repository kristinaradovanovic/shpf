import React from 'react';

export type HeadingProps = React.HTMLProps<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
