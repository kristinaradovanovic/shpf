import { HeaderSchemaType } from '@/schemas/header/header.types';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import * as styles from './Header.css';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

const Header = ({ headerItems, ctaButton }: HeaderSchemaType) => {
  const { locale, asPath } = useRouter();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const compactRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const currentLocale = (locale || 'sv').toLowerCase();

  useEffect(() => {
    const DESKTOP_MIN_WIDTH = 1024;

    const isDesktopViewport = () => window.innerWidth >= DESKTOP_MIN_WIDTH;

    const onScrollFrame = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const TOP_EXPAND_THRESHOLD = 32;
      const DOWN_COMPACT_DELTA = 4;
      const UP_EXPAND_DELTA = -8;

      let nextCompact = compactRef.current;

      if (!isDesktopViewport()) {
        nextCompact = false;
      } else if (currentScrollY <= TOP_EXPAND_THRESHOLD) {
        nextCompact = false;
      } else if (delta > DOWN_COMPACT_DELTA) {
        nextCompact = true;
      } else if (delta < UP_EXPAND_DELTA) {
        nextCompact = false;
      }

      if (nextCompact !== compactRef.current) {
        compactRef.current = nextCompact;
        setIsCompact(nextCompact);
      }

      lastScrollY.current = currentScrollY;
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(onScrollFrame);
    };

    const onResize = () => {
      if (!isDesktopViewport()) {
        compactRef.current = false;
        setIsCompact(false);
      }
    };

    lastScrollY.current = window.scrollY;
    compactRef.current = isDesktopViewport() && window.scrollY > 32;
    setIsCompact(compactRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const shouldCompact = isCompact && !isMobileMenuOpen;

  return (
    <header className={`${styles.header} ${shouldCompact ? styles.headerCompact : ''}`}>
      <div className={styles.headerInner}>
        <HeaderDesktop
          headerItems={headerItems}
          ctaButton={ctaButton}
          isCompact={shouldCompact}
          currentLocale={currentLocale}
          asPath={asPath}
        />
        <HeaderMobile
          headerItems={headerItems}
          currentLocale={currentLocale}
          asPath={asPath}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        />
      </div>
    </header>
  );
};

export default Header;
