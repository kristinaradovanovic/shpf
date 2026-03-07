import { HeadingProps } from './Heading.types';

export const Heading: React.FC<HeadingProps> = ({
  children,
  as = 'h2',
  className,
  ...otherProps
}) => {
  const Element = as;
  return (
    <Element
      className={className}
      {...otherProps}
    >
      {children}
    </Element>
  );
};
