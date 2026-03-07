import { groq } from 'next-sanity';

export const getNewsletter = groq`*[_type == "newsletter"]`;
