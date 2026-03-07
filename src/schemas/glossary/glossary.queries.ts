import { groq } from 'next-sanity';

export const getGlossary = groq`*[_type == "glossary"]`;
