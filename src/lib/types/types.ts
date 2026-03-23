import { FooterSchemaType } from '@schemas/footer/footer.types';
import { HeaderSchemaType } from '@schemas/header/header.types';
import { PageSchemaType } from '@schemas/page/page.types';
import { CSSProperties } from 'react';
import { FileAsset, ImageAsset } from 'sanity';
import { KeywordSchemaType } from '@schemas/keyword/keyword.types';
import { Settings } from '@schemas/settings/settings.types';

export interface FieldType {
  _type: string;
}
export interface SchemaType extends FieldType, BlockType {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
}

export interface LocalizedSchemaType {
  language: string;
}

export interface BlockType {
  _key: string;
  _type: string;
  style: CSSProperties;
}

export interface MenuType {
  id: string;
  parent: string | null;
  slug: string;
  isRoot: boolean;
  isIndex: boolean;
  icon: FileAsset;
  title: string;
}

export type NavbarType = { tree: MenuType[] };

export type TreeType = MenuType & { children: TreeType[] };

export type NodeTypeIntersection = PageSchemaType;

export type NodeTypeUnion = PageSchemaType;

export type NodeTypeInMenu = {
  isRoot: boolean;
  slug: string;
  slugParentRef: string;
};

export type ArrayMemberType = {
  _key: string;
  _type: string;
};

export type CtaLinkParentType = {
  title: string;
  slug: string;
  language?: string;
  isRoot?: boolean;
  slugParent: CtaLinkParentType;
};

export type CtaLinkType = {
  _type?: string;
  _id: string;
  title: string;
  language?: string;
  slug: string;
  isRoot?: boolean;
  slugParent: CtaLinkParentType;
  filterParentPage?: CtaLinkType;
  isIndex?: boolean;
  _updatedAt: string;
  _createdAt: string;
  includeInSitemap?: boolean;
};

export type PaginationLinkType = {
  title?: string;
  slug?: string;
  slugParent?: string;
  metaKeywords?: (KeywordSchemaType & ArrayMemberType)[];
};

export type ImageWithAltType = {
  asset: ImageAsset;
  alt: string;
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type ImageWithAltAndTitleType = {
  asset: ImageAsset;
  alt: string;
  title: string;
};

export type TranslationMetadataEntryType = {
  _type: string;
  _key: string;
  value: CtaLinkType;
  _createdAt: string;
  _rev: string;
  _id: string;
  _updatedAt: string;
  schemaTypes: string[];
};

export type TranslationMetadataIDType = { _id: string };

export type TranslationMetadataType = TranslationMetadataEntryType[];

export type TranslationMetadataObjectType = {
  _id: string;
  _type: string;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
  translations: TranslationMetadataType;
};

export type NodeOnlyWithTranslationMetadataType = {
  translationMetadata: TranslationMetadataObjectType;
};

export type NodeWithTranslationMetadataType = NodeTypeUnion &
  NodeOnlyWithTranslationMetadataType & {
    header: HeaderSchemaType;
    footer: FooterSchemaType;
    settings: Settings;
  };

export type NodeTypeWithLocale = {
  value: NodeWithTranslationMetadataType;
  shouldBeRedirectedTo: string;
};

export type ToggleShowPreviewProps = {
  toggleShowPreview: (() => void) | undefined;
};

type QueryParamValue = string | undefined;

export type ExpectedQueryParams<T extends string = string> = {
  readonly [K in T]?: QueryParamValue;
};
