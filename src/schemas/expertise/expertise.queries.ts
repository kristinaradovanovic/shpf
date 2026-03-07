import { groq } from 'next-sanity';

export const expertiseBaseFields = groq`
    title,
`;

export const expertiseSchemaFields = groq`
    ...,
    "blocks": null,
    ${expertiseBaseFields}
    `;

export const expertiseSchemaFieldsWithBlocks = groq`
    ...,
    ${expertiseBaseFields}`;
