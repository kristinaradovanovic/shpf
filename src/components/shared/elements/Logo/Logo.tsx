import { PawIcon } from '@components/shared/ui/icons/PawIcon';
import Link from 'next/link';
import React from 'react';
import { logoIcon, logoLink, logoText, logoTextStrong, logoWrapper } from './Logo.css';

const Logo = () => {
  return (
    <Link
      href="/"
      className={logoLink}
      aria-label="PawPal – till startsidan"
    >
      <div className={logoWrapper}>
        <PawIcon className={logoIcon} />

        <span className={logoText}>
          Paw<span className={logoTextStrong}>Pal</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
