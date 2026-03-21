import { CTAButtonItemSchemaType } from '@schemas/ctaButtonItem/ctaButtonItem.types';
import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren & {
  id?: string;
  text?: string;
  href?: string;
  isDisabled?: boolean;
  buttonType?: 'button' | 'submit' | 'reset';
  variant?: 'golden' | 'whiteOutlined' | 'navyOutlined' | 'navy';
  iconRight?: boolean;
  className?: string;
  ctaButton?: CTAButtonItemSchemaType;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
