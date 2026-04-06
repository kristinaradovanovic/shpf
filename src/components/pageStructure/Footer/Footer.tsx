import { extractLinkOrSlug, linkMail, linkTel } from '@lib/utils/link-utils';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@lib/sanity/sanity.image';
import { FooterProps } from './Footer.types';
import {
  brandPanel,
  brandDescription,
  brandTitle,
  contactLabel,
  contactValue,
  footerRoot,
  legalLink,
  legalLinks,
  logoWrap,
  mutedText,
  navColumn,
  navColumnList,
  navColumnTitle,
  navLink,
  socialLinksWrap,
  sectionTitle,
  topGrid,
} from './Footer.css';

const normalizeInternalHref = (href: string) => {
  if (!href) return '/';
  if (href.startsWith('/') || href.startsWith('?')) return href;
  return `/${href}`;
};

export default function Footer({ footer, showFooter }: FooterProps) {
  if (!showFooter || !footer) {
    return null;
  }

  const logoUrl = footer.image?.asset ? urlForImage(footer.image.asset, 75).url() : '';
  const socialLinks = footer.navSocials?.socialLinkItems || [];
  const footerColumns = footer.footerItems || [];
  const policyLinks = footer.policies?.pages || [];

  const currentYear = new Date().getFullYear();
  const copyrightText =
    footer.copyright || (footer?.title ? `© ${currentYear} ${footer.title}` : `© ${currentYear}`);

  return (
    <footer className={footerRoot}>
      <div className={topGrid}>
        <section className={brandPanel}>
          {logoUrl && (
            <div className={logoWrap}>
              <Image
                src={logoUrl}
                alt={footer.image?.alt || footer.title || 'Footer logo'}
                width={300}
                height={86}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
          {footer.title && <h3 className={brandTitle}>{footer.title}</h3>}
          {footer.description && <p className={brandDescription}>{footer.description}</p>}
        </section>

        <section>
          {footer.footerItemsTitle && <h4 className={sectionTitle}>{footer.footerItemsTitle}</h4>}
          <div className={navColumnList}>
            {footerColumns.map((item) => {
              const pageHref = normalizeInternalHref(extractLinkOrSlug(item.page));
              return (
                <div
                  key={item._key}
                  className={navColumn}
                >
                  <Link
                    href={pageHref}
                    className={navColumnTitle}
                  >
                    {item.page?.title || 'Untitled'}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h4 className={sectionTitle}>{footer.contactDetails?.contactTitle || 'Contact'}</h4>
          {footer.contactDetails?.subtitle && (
            <p className={mutedText}>{footer.contactDetails.subtitle}</p>
          )}
          {footer.contactDetails?.name && (
            <p className={contactValue}>{footer.contactDetails.name}</p>
          )}

          {footer.contactDetails?.email && (
            <p>
              <span className={contactLabel}>Email: </span>
              <a
                className={navLink}
                href={linkMail(footer.contactDetails.email)}
              >
                {footer.contactDetails.email}
              </a>
            </p>
          )}

          {footer.contactDetails?.phone && (
            <p>
              <span className={contactLabel}>Phone: </span>
              <a
                className={navLink}
                href={linkTel(footer.contactDetails.phone)}
              >
                {footer.contactDetails.phone}
              </a>
            </p>
          )}

          {(footer.contactDetails?.addressTitle || footer.contactDetails?.address) && (
            <p className={contactValue}>
              {footer.contactDetails.addressTitle && (
                <span className={contactLabel}>{footer.contactDetails.addressTitle}: </span>
              )}
              {footer.contactDetails.address}
              {footer.contactDetails.postal ? `, ${footer.contactDetails.postal}` : ''}
            </p>
          )}

          {socialLinks.length > 0 && (
            <div className={socialLinksWrap}>
              <h5 className={sectionTitle}>{footer.navSocials?.navSocialsTitle || 'Follow us'}</h5>
              <div className={legalLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social._key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={legalLink}
                  >
                    {social.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/*  <div className={legalRow}>
        <p className={mutedText}>{copyrightText}</p>
        <nav className={legalLinks}>
          {policyLinks.map((policy) => {
            const policyHref = normalizeInternalHref(extractLinkOrSlug(policy));
            return (
              <Link
                key={`${policy._id}-${policy.slug}`}
                href={policyHref}
                className={legalLink}
              >
                {policy.title}
              </Link>
            );
          })}
        </nav>
      </div> */}
    </footer>
  );
}
