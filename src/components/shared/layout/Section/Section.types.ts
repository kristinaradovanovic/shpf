import { BackgroundColorTypes } from '@lib/styles/variables/colors';
import { BlockSpacingTypes } from '@lib/styles/variables/spacings';
import { PropsWithChildren } from 'react';

export type SectionProps = React.HTMLAttributes<HTMLElement> &
  PropsWithChildren & {
    className?: string;
    backgroundColor?: BackgroundColorTypes;
    blockSpacing?: BlockSpacingTypes;
  };
