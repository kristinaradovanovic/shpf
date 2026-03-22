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
  _type,
  _id,
  "isIndex": coalesce(isIndex, false),
  "title": coalesce(node.title, title),
  language,
  "slug": coalesce(node.slug.current, slug.current),
  "slugParent": select(defined(node.slugParent) => node.slugParent->node {
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
  }),
  "filterParentPage": select(_type == "filterPage" => *[_type == "page" && references(^._id)][0] {
    _type,
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
      },
    },
    isRoot,
  }),
  "isRoot": coalesce(isRoot, false),
  _updatedAt,
  _createdAt,
  "includeInSitemap": coalesce(includeInSitemap, false)
`;
