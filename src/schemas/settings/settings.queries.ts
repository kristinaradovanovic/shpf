import { groq } from 'next-sanity';

export const getSettingsQuery = groq`*[_type == "settings"][0]`;

export const settingsFields = groq`
*[_type=="settings"][0] {
  ...,
  "iconLight":iconLight.asset->,
  "iconDark":iconDark.asset->,
  "mobileIcon":mobileIcon.asset->,
  "defaultOgImage":defaultOgImage.asset->
}
`;
