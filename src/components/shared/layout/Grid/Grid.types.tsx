import { PropsWithChildren } from 'react';
import { GridStyleVariants } from './Grid.css';
export type GridProps = React.HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    className?: string;
    variants?: GridStyleVariants;
  };
