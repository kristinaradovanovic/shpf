import Link from 'next/link';
import { ReactNode } from 'react';
import { navLinkStyle } from './NavLink.css';

type NavLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function NavLink({ href = '', children, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${navLinkStyle} ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
