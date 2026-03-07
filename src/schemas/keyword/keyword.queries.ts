import { groq } from 'next-sanity';

export const getKeyword = groq`*[_type == "keyword"]`;
