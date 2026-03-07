import React from 'react';

export type CustomHeadingProps = React.HTMLProps<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
};
