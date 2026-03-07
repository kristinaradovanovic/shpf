import { ctaLinkFields, fileAssetFields } from '@lib/queries/queries';
import { groq } from 'next-sanity';
export const pageSchemaFields = groq`
    ...,
    "blocks": null,
    node {
        ${ctaLinkFields}
    },
    image {
        ${fileAssetFields}
    }
`;

export const pageSchemaFieldsWithBlocks = groq`
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
    image {
        ${fileAssetFields}
    }
`;

export const getPage = groq`*[_type == 'page']`;
export const getPageBySlug = groq`*[_type == 'page' && slug.current == $slug][0]`;
export const getPageById = groq`*[_type == 'page' && _id == $id][0]`;
export const getPagePropById = groq`*[_type == 'page' && _id == $id][0][$prop]`;
export const getAllPagesSlugsQuery = groq`*[_type == 'page']{
    ${ctaLinkFields}
}`;
