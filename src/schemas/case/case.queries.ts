import { ctaLinkFields, fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';

export const caseSchemaBaseFields = groq`
    ...,
    node {
          ...,
          "slug": slug.current,
          "slugParent": slugParent->node {
              "slug": slug.current,
              "slugParent": slugParent->node.slug.current,
              "metaKeywords": metaKeywords[]->name
          },
          "metaKeywords": metaKeywords[]->name
      },
    "ctaLinkFields": {
        ${ctaLinkFields}
    },
    expertises[]-> {
        title,
    },
    image {
        ${fileAssetFields}
    },
    video {
        ${fileAssetFields}
    }
`;

export const caseSchemaFields = groq`
      ...,
      "blocks": null,
      ${caseSchemaBaseFields}
  `;

export const caseFieldsWithBlocks = groq`
      ...,
      ${caseSchemaBaseFields}
  `;
