import clsx from 'clsx';
import { SectionProps } from './Section.types';

export const Section = ({
  children,
  blockSpacing = 'medium',
  className,
  ...otherProps
}: SectionProps) => {
  return (
    <section
      className={clsx(className)}
      {...otherProps}
    >
      {children}
    </section>
  );
};
