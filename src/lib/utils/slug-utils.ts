import type { SlugValue } from '@sanity/types';

export const slugMaxLength = 200;

export function slugCleaner(slug: string) {
  return slug
    .slice(0, slugMaxLength)
    .toLowerCase()
    .replaceAll('å', 'a')
    .replaceAll('ä', 'a')
    .replaceAll('ö', 'o')
    .replaceAll('&', 'and')
    .replace(/\s+/g, '-')
    .replace(/[^\w\s-]/g, '');
}

export function slugValidateLowercase(slug: SlugValue | undefined) {
  return slug?.current !== slug?.current?.toLowerCase() ? 'Slug must be all lowercase' : true;
}

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export const redirect2SamePage = (redirect: string, path: string) => {
  const baseUrlNoTrail = process.env.NEXT_PUBLIC_BASEURL?.slice(0, -1);
  const currentUrl = `${baseUrlNoTrail}${path}`;

  if (redirect === path || redirect === currentUrl) {
    return true;
  }
  return false;
};
