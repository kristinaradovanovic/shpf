import React from 'react';
import clsx from 'clsx';
import { unStyledLink } from '@lib/styles/shared.css';
import Link from 'next/link';
import { extractLinkOrSlug, linkMail } from '@lib/utils/link-utils';
import { buttonIcon, buttonStyle } from './Button.css';
import { ButtonProps } from './Button.types';
import { ArrowRightIcon } from '@sanity/icons';

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    ctaButton,
    id,
    href,
    text = ctaButton?.ctaTitle,
    onClick,
    buttonType = 'button',
    variant = 'golden',
    iconRight = false,
    className,
    isDisabled = false,
    ...otherProps
  },
  ref,
) => {
  const buttonContent = (
    <button
      id={id}
      ref={ref}
      disabled={isDisabled}
      type={buttonType}
      onClick={onClick}
      className={clsx(
        className,
        buttonStyle({
          variant,
          isDisabled,
        }),
      )}
      {...otherProps}
    >
      {text}

      {iconRight && variant !== 'golden' && <ArrowRightIcon className={buttonIcon} />}
    </button>
  );

  const getButtonVariant = () => {
    if (!href && !ctaButton) return buttonContent;

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={unStyledLink}
        >
          {buttonContent}
        </a>
      );
    }

    if (ctaButton) {
      const { ctaType, ctaLink, ctaPage, ctaMail } = ctaButton;

      switch (ctaType) {
        case 'link':
          return (
            <a
              href={ctaLink?.startsWith('http') ? ctaLink : `https://${ctaLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className={unStyledLink}
            >
              {buttonContent}
            </a>
          );

        case 'page':
          return ctaPage ? (
            <Link
              href={extractLinkOrSlug(ctaPage)}
              className={unStyledLink}
            >
              {buttonContent}
            </Link>
          ) : (
            buttonContent
          );

        case 'mail':
          return (
            <a
              href={ctaMail ? linkMail(ctaMail) : ''}
              className={unStyledLink}
            >
              {buttonContent}
            </a>
          );

        default:
          return buttonContent;
      }
    }
  };

  return getButtonVariant() as React.ReactNode;
};

export default React.forwardRef(Button);
