import { groq } from 'next-sanity';

export const getRedirect = groq`*[_type == 'redirect'] {
    destination,
    source,
    permanent
  }
  `;
