import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSchemaType } from '@/schemas/header/header.types';
import * as styles from './HeaderMobile.css';

interface HeaderMobileProps {
  headerItems?: HeaderSchemaType['headerItems'];
  currentLocale: string;
  asPath: string;
  isMobileMenuOpen: boolean;
  onToggle: () => void;
}

const HeaderMobile = ({
  headerItems,
  currentLocale,
  asPath,
  isMobileMenuOpen,
  onToggle,
}: HeaderMobileProps) => {
  const mobileNavId = 'mobile-header-navigation';

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileRow}>
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
              sizes="48px"
              className={styles.logoImage}
              priority
            />
          </div>
        </Link>

        <div className={styles.siteTitle}>Les Clefs d&apos;Or Sweden</div>

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

          <button
            type="button"
            className={styles.mobileMenuButton}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            onClick={onToggle}
          >
            <span
              className={`${styles.mobileMenuLine} ${isMobileMenuOpen ? styles.mobileMenuLineTopOpen : ''}`}
            />
            <span
              className={`${styles.mobileMenuLine} ${isMobileMenuOpen ? styles.mobileMenuLineMiddleOpen : ''}`}
            />
            <span
              className={`${styles.mobileMenuLine} ${isMobileMenuOpen ? styles.mobileMenuLineBottomOpen : ''}`}
            />
          </button>
        </div>
      </div>

      <div
        id={mobileNavId}
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {headerItems?.map((item) => {
              const slug = item?.page?.slug;
              const href = !slug ? '/' : `/${slug}`;
              return (
                <li
                  key={item._key}
                  className={styles.mobileNavItem}
                >
                  <Link
                    href={href}
                    className={styles.mobileNavLink}
                    onClick={onToggle}
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

export default HeaderMobile;
