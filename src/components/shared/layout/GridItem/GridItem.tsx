import { gridItemStyle } from './GridItem.css';
import { GridItemProps } from './GridItem.types';

export const GridItem = ({ children, className = gridItemStyle, ...otherProps }: GridItemProps) => (
  <div
    className={className}
    {...otherProps}
  >
    {children}
  </div>
);
