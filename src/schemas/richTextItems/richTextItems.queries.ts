import { ctaLinkFields, fileAssetFields } from '@lib/queries/queries';
import { richTextCtaButtonSchemaFields } from '@schemas/richTextCtaButton/richTextCtaButton.queries';
import { groq } from 'next-sanity';

export const richTextItemsSchemaFields = groq`
  ...,
  _type == "image" => {
    ${fileAssetFields}
  },
  _type == "richTextCtaButton" => {
    ${richTextCtaButtonSchemaFields}
  },
  _type == "video" => {
    ...,
    "videoReference": videoReference {
    ...,
    videoType == "video" => {
      "video": video.asset-> {
      ...
      }
    }
    }
  },
  _type == "block" && markDefs[0].linkType == "internal" => {
    markDefs[]{
    ...,
    "reference": reference->{
      ${ctaLinkFields}
    }
    }
  },
  _type == "block" && markDefs[0].linkType == "external" => {
    ...,
  },
  _type == "infoBox" => {
    ...,
    "content": content[]{
    ...,
    markDefs[0].linkType == "internal" => {
      markDefs[]{
      ...,
      "reference": reference->{
        ${ctaLinkFields}
      }
      }
    }
    }
  }
  `;
