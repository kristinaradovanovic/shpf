import { ctaLinkFields, fileAssetFields } from '@lib/queries/queries';
import { footerSchemaFields } from '@schemas/footer/footer.queries';
import { headerSchemaFields } from '@schemas/header/header.queries';
import { groq } from 'next-sanity';
import { HomeHeroBlockQuery } from '../blocks/HomeHeroBlock/HomeHeroBlock.queries';
import { SplitContentWithCtaBlockQuery } from '../blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.queries';
import { MembersCtaBlockQuery } from '../blocks/MembersCtaBlock/MembersCtaBlock.queries';
import { PartnersCtaBlockQuery } from '../blocks/PartnersCtaBlock/PartnersCtaBlock.queries';
import { MembershipCtaBlockQuery } from '../blocks/MembershipCtaBlock/MembershipCtaBlock.queries';
import { RichTextBlockQuery } from '../blocks/RichTextBlock/RichTextBlock.queries';
import { SplitContentBlockQuery } from '../blocks/SplitContentBlock/SplitContentBlock.queries';
import { ImageBlockQuery } from '../blocks/ImageBlock/ImageBlock.queries';
import { TitleAndDescriptionBlockQuery } from '../blocks/TitleAndDescriptionBlock/TitleAndDescriptionBlock.queries';
import { PillarsGridBlockQuery } from '../blocks/PillarsGridBlock/PillarsGridBlock.queries';
// do not use barrel file, queries become undefined

// add each field query from each block to this array
const blockQueries: any = [
  HomeHeroBlockQuery,
  SplitContentWithCtaBlockQuery,
  MembersCtaBlockQuery,
  PartnersCtaBlockQuery,
  MembershipCtaBlockQuery,
  RichTextBlockQuery,
  SplitContentBlockQuery,
  ImageBlockQuery,
  TitleAndDescriptionBlockQuery,
  PillarsGridBlockQuery,
];

const blockFields = groq`
    defined(isIndex) => {
        isIndex == true => {
            blocks[] {
                ...,
                ${blockQueries.join(',')}
            }
        },
        isIndex == false => {
            blocks[] {
            
            }
        }
    },
    !defined(isIndex) => {
        blocks[] {
            ...,
            ${blockQueries.join(',')}
        }
    }
`;

const filterPageModulesProjection = groq`
    "modules": coalesce(modules, blocks, [])[] {
        ...,
        ${blockQueries.join(',')}
    }
`;

const filterPageFields = groq`
    "heroWithSubpages": heroWithSubpages {
        ...
    },
    "filterPages": filterPages[]-> {
        _id,
        _type,
        "title": coalesce(title, node.title),
        "slug": coalesce(slug.current, node.slug.current),
        "tabLabel": coalesce(tabLabel, node.title),
        image {
            ${fileAssetFields}
        },
        ${filterPageModulesProjection},
        "seo": select(
          _type == "filterPage" => seo {
              ...,
              "metaKeywords": metaKeywords[]->name,
              ogImage {
                  ${fileAssetFields}
              }
          },
          _type == "page" => {
              "includeInSearchEngines": node.includeInSearchEngines,
              "metaTitle": node.metaTitle,
              "metaDescription": node.metaDescription,
              "metaKeywords": node.metaKeywords[]->name,
              "ogImage": node.ogImage {
                  ${fileAssetFields}
              },
              "ogImageAlt": node.ogImageAlt
          },
          null
        )
    },
    "defaultFilterPage": defaultFilterPage-> {
        _id,
        _type,
        "title": coalesce(title, node.title),
        "slug": coalesce(slug.current, node.slug.current),
        "tabLabel": coalesce(tabLabel, node.title),
        image {
            ${fileAssetFields}
        },
        ${filterPageModulesProjection},
        "seo": select(
          _type == "filterPage" => seo {
              ...,
              "metaKeywords": metaKeywords[]->name,
              ogImage {
                  ${fileAssetFields}
              }
          },
          _type == "page" => {
              "includeInSearchEngines": node.includeInSearchEngines,
              "metaTitle": node.metaTitle,
              "metaDescription": node.metaDescription,
              "metaKeywords": node.metaKeywords[]->name,
              "ogImage": node.ogImage {
                  ${fileAssetFields}
              },
              "ogImageAlt": node.ogImageAlt
          },
          null
        )
    }
`;

export const slugField = groq`
    "slug": slug.current,
    "slugParent": slugParent->node.slug.current
`;

export const slugFieldWithMetaKeywords = groq`
    ${slugField},
    "metaKeywords": metaKeywords[]->name
`;

export const slugFieldWithoutMetaKeywords = groq`
    ${slugField}
`;

export const slugParentField = groq`
    "slugParent": slugParent->node {
        ${slugField}
    }
`;

export const slugParentFieldWithMetaKeywords = groq`
    "slugParent": slugParent->node {
        ${slugFieldWithMetaKeywords}
    }
`;

export const slugParentFieldWithoutMetaKeywords = groq`
    "slugParent": slugParent->node {
        ${slugFieldWithoutMetaKeywords}
    }
`;

export const dereferencedNodeSchemaFields = groq`
    "slug": slug.current,
    ${slugParentField},
    "metaKeywords": metaKeywords[]->name,
    ogImage {
        ${fileAssetFields}
    },
    ogImageAlt
`;

export const dereferencedNodeSchemaFieldsSimple = groq`
    "slug": slug.current,
    ${slugParentFieldWithoutMetaKeywords}
`;

const translationFields = groq`
  translations[] {
    ...,
    value-> {
      ${ctaLinkFields}
    }
  }
`;

const nodeTranslationMetadataFields = groq`"translationMetadata": *[_type == 'translation.metadata' && references(^._id)][0] {
    ...,
    ${translationFields}
}`;

export const getTranslationsByID = groq`*[_type == 'translation.metadata' && references($id)][0].${translationFields}`;
export const getTranslationObjectByID = groq`*[_type == 'translation.metadata' && references($id)][0] {
  ...,
  ${translationFields}
}`;
export const getTranslationsRefByID = groq`*[_type == 'translation.metadata' && references($id)][0]._id`;

export const nodeSchemaFields = groq`
    node {
        ...,
        ${dereferencedNodeSchemaFields},
    },
    ${nodeTranslationMetadataFields}
`;

export const nodeFullSchemaFields = groq`
    ${nodeSchemaFields},
    ${filterPageFields},
    ${blockFields}
`;

const filteredFields = groq`
    isRoot,
    _id,
    "slug": node.slug.current,
    "slugParentRef": node.slugParent._ref,
    ${nodeTranslationMetadataFields}
`;

export const getParentWithNodeBySlug = groq`*[defined(node) && node.slug.current == $slug && language == $language][0] {
    ...,
    ${nodeFullSchemaFields},
    "header": *[_type == 'header' && language == $language][0] {
        ${headerSchemaFields}
    },
    "footer": *[_type == 'footer' && language == $language][0] {
        ${footerSchemaFields}
    }
}`;

export const getParentWithNodeBySlugTranslations = groq`*[defined(node) && node.slug.current == $slug][0] {
    ${nodeTranslationMetadataFields}
}`;

export const getParentWithNodeExistsBySlug = groq`*[defined(node) && node.slug.current == $slug && language == $language][0] {
    _id
}`;

export const getParentWithNodeBySlugFiltered = groq`*[defined(node) && node.slug.current == $slug && language == $language][0] {
    ${filteredFields}
}`;

export const getParentWithNodeById = groq`*[defined(node) && _id == $id && language == $language][0] {
    ...,
    ${nodeFullSchemaFields},
    "header": *[_type == 'header' && language == $language][0] {
        ${headerSchemaFields}
    },
    "footer": *[_type == 'footer' && language == $language][0] {
        ${footerSchemaFields}
    }
}`;
export const getParentWithNodeByIdSimple = groq`*[defined(node) && _id == $id][0] {
    ${ctaLinkFields}
}`;

export const getAllNodesMinimalQuery = groq`*[defined(node) && !(_id in path('drafts.**'))] {
    ${ctaLinkFields}
}`;

export const getParentWithNodeLanguageById = groq`*[defined(node) && _id == $id && defined(language)][0].language`;

export const getParentWithNodeByIdFiltered = groq`*[defined(node) && _id == $id][0] {
    ${filteredFields}
}`;

export const getParentWithRootNode = groq`*[defined(node) && isRoot == true && language == $language][0] {
    ...,
    ${nodeFullSchemaFields},
    "header": *[_type == 'header' && language == $language][0] {
        ${headerSchemaFields}
    },
    "footer": *[_type == 'footer' && language == $language][0] {
        ${footerSchemaFields}
    }
}`;

export const getParentWithRootNodeTranslations = groq`*[defined(node) && isRoot == true][0] {
    ${nodeTranslationMetadataFields}
}`;
export const getParentWithRootNodeFiltered = groq`*[defined(node) && isRoot == true][0] {
    ${filteredFields}
}`;

export const getSitemapAllNodesQuery = groq`*[defined(node) && !(_id in path('drafts.**'))] {
    ${ctaLinkFields}
}`;
