import { HeaderSchemaType } from '@/schemas/header/header.types';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import * as styles from './Header.css';

const Header = ({ headerItems, ctaButtonText }: HeaderSchemaType) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY <= 32) {
        setIsCompact(false);
      } else if (isScrollingDown) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }

      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isCompact ? styles.headerCompact : ''}`}>
      <div className={styles.headerInner}>
        <div className={`${styles.topRow} ${isCompact ? styles.topRowCompact : ''}`}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Go to homepage"
          >
            <div className={styles.logoBadgeWrap}>
              <span className={styles.logoPoint} />
              <span className={styles.logoBadge}>Σ</span>
            </div>
          </Link>

          <div className={`${styles.siteTitle} ${isCompact ? styles.siteTitleCompact : ''}`}>
            Les Clefs d&apos;Or Sweden
          </div>

          <button className={styles.ctaButton}>{ctaButtonText || 'Become a Member'}</button>

          <button
            type="button"
            className={styles.mobileMenuButton}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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

        <div className={`${styles.bottomRow} ${isCompact ? styles.bottomRowCompact : ''}`}>
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

        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {headerItems?.map((item) => {
                const slug = item?.page?.slug;
                const href = !slug ? '/' : `/${slug}`;

                return (
                  <li key={item._key}>
                    <Link
                      href={href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsMobileMenuOpen(false)}
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
    </header>
  );
};

export default Header;
