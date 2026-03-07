import { groq } from 'next-sanity';

export const getMenus = groq`*[_id == "navbar-hierarchy"][0]{
    tree[] {
      "id":_key,
      parent,
      "slug":value.reference->page.node.slug.current,
      "isRoot":value.reference->page.isRoot,
      'isIndex':value.reference->page.isIndex,
      "title":value.reference->page.node.title
    }
}`;

export const fileAssetFields = groq`
    ...,
    asset->,
`;

export const ctaLinkFields = groq`
  _id,
  "isIndex": isIndex,
  "title": node.title,
  language,
  "slug": node.slug.current,
  "slugParent": node.slugParent->node {
    title,
    "isIndex": ^.node.slugParent->isIndex,
    "isRoot": ^.node.slugParent->isRoot,
    "slug": slug.current,
    "slugParent": slugParent->node {
      title,
      "isIndex": ^.slugParent->isIndex,
      "isRoot": ^.slugParent->isRoot,
      "slug": slug.current,   
      "slugParent": slugParent->node {
        title,
        "isIndex": ^.slugParent->isIndex,
        "isRoot": ^.slugParent->isRoot,
        "slug": slug.current,  
      },
    },
    "metaKeywords": metaKeywords[]->name,
  },
  isRoot,
  _updatedAt,
  _createdAt,
  includeInSitemap
`;
