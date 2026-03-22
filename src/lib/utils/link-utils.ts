import { CtaLinkType } from '@lib/types/types';

type LinkProps = {
  _type?: string;
  slugParent?: string;
  slug: string;
  language?: string;
  filterParentPage?: CtaLinkType;
};

export const buildFullSlugPath = (
  { slugParent, slug, language }: CtaLinkType,
  excludeLanguage?: boolean,
) => {
  const defaultLanguage = 'sv-SE';
  if (!slugParent && !slug) {
    return '/';
  }

  const slugs = [];

  slug = slug ? slug : '/';

  if (!slugParent) {
    slugs.push(slug);

    // don't add language to the path if it's the default language
    if (language && !excludeLanguage && language !== defaultLanguage) {
      slugs.push(language);
    }

    return slugs.reverse().join('/');
  }

  if (typeof slugParent === 'string') {
    slugs.push(slug);
    slugs.push(slugParent);

    // don't add language to the path if it's the default language
    if (language && !excludeLanguage && language !== defaultLanguage) {
      slugs.push(language);
    }

    return slugs.reverse().join('/');
  }

  // Traverse up as long as slugParent is an object with a slug
  while (slugParent && typeof slugParent === 'object') {
    if (slugParent?.slug) {
      slugs.push(slugParent?.slug);
    }

    if (!slugParent?.slugParent) break;

    // Move up to the next parent
    slugParent = slugParent?.slugParent;
  }

  slugs.reverse();

  if (typeof slugParent === 'string') {
    slugs.push(slugParent);
  }

  slugs.push(slug);
  let joinedSlugPath = slugs.join('/');

  if (language && !excludeLanguage && language !== defaultLanguage) {
    joinedSlugPath = `${language}/${joinedSlugPath}`;
  }

  return joinedSlugPath;
};

/**
 * Removes any query parameters from a URL
 */
export function sanitizeURL(url: string) {
  return url.replace(/\?.*$/, '');
}

export function extractLinkOrSlug(ctaLink: LinkProps | CtaLinkType, excludeLanguage?: boolean) {
  if (ctaLink?._type === 'filterPage' && ctaLink?.slug) {
    if (ctaLink.filterParentPage) {
      const parentPath = buildFullSlugPath(ctaLink.filterParentPage, !excludeLanguage);
      return `${sanitizeURL(parentPath)}?page=${ctaLink.slug}`;
    }

    return `?page=${ctaLink.slug}`;
  }

  const ctaLinkObject = {
    slugParent: ctaLink?.slugParent,
    slug: ctaLink?.slug,
    language: ctaLink?.language,
  };
  const completePath = buildFullSlugPath(ctaLinkObject as CtaLinkType, !excludeLanguage);

  return completePath;
}

export function linkURL(link: string) {
  return linkAs(link, 'url');
}

export function linkMail(link: string) {
  return linkAs(link, 'mail');
}

export function linkTel(link: string) {
  return linkAs(link, 'tel');
}

function linkAs(link: string, linkType: 'mail' | 'tel' | 'url') {
  if (!link) {
    return '';
  }

  if (linkType === 'mail') {
    return `mailto:${link}`;
  }

  if (linkType === 'tel') {
    return `tel:${link}`;
  }

  return link;
}
