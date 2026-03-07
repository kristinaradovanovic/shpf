import { gridStyle } from './Grid.css';
import { GridProps } from './Grid.types';

export const Grid = ({
  variants,
  className = gridStyle(variants),
  children,
  ...otherProps
}: GridProps) => (
  <div
    className={className}
    {...otherProps}
  >
    {children}
  </div>
);
