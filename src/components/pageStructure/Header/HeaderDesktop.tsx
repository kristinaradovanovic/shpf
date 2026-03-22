import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/shared/elements/Button/Button';
import { HeaderSchemaType } from '@/schemas/header/header.types';
import * as styles from './HeaderDesktop.css';

interface HeaderDesktopProps {
  headerItems?: HeaderSchemaType['headerItems'];
  ctaButton?: HeaderSchemaType['ctaButton'];
  isCompact: boolean;
  currentLocale: string;
  asPath: string;
}

const HeaderDesktop = ({
  headerItems,
  ctaButton,
  isCompact,
  currentLocale,
  asPath,
}: HeaderDesktopProps) => {
  const headerCtaButton = ctaButton?.ctaPage
    ? { ...ctaButton, ctaType: 'page' as const }
    : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.topRow} ${isCompact ? styles.topRowCompact : ''}`}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Go to homepage"
        >
          <div className={styles.logoBadgeWrap}>
            <Image
              src="/no-text-logo.png"
              alt="Les Clefs d'Or Sweden logo"
              fill
              sizes="60px"
              className={styles.logoImage}
              priority
            />
          </div>
        </Link>

        <div className={`${styles.siteTitle} ${isCompact ? styles.siteTitleCompact : ''}`}>
          Les Clefs d&apos;Or Sweden
        </div>

        <div className={styles.rightControls}>
          <div className={styles.languageSwitch}>
            <Link
              href={asPath}
              locale="en"
              className={`${styles.langLink} ${currentLocale === 'en' ? styles.langLinkActive : ''}`}
            >
              EN
            </Link>
            <span className={styles.langDivider}>/</span>
            <Link
              href={asPath}
              locale="sv"
              className={`${styles.langLink} ${currentLocale === 'sv' ? styles.langLinkActive : ''}`}
            >
              SV
            </Link>
          </div>

          <div className={styles.ctaButtonWrapper}>
            {headerCtaButton ? (
              <Button
                ctaButton={headerCtaButton}
                variant="headerPremium"
              />
            ) : (
              <Button
                text={ctaButton?.ctaTitle || 'Become a Member'}
                variant="headerPremium"
              />
            )}
          </div>
        </div>
      </div>

      <div
        className={styles.bottomRow}
        style={{
          maxHeight: isCompact ? '0px' : '80px',
          opacity: isCompact ? 0 : 1,
          pointerEvents: isCompact ? 'none' : undefined,
        }}
      >
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {headerItems?.map((item) => {
              const slug = item?.page?.slug;
              const href = !slug ? '/' : `/${slug}`;
              return (
                <li key={item._key}>
                  <Link
                    href={href}
                    className={styles.navLink}
                  >
                    {item?.page?.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderDesktop;
