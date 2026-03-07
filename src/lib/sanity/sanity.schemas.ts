// import { hierarchyTree } from '@sanity/hierarchical-document-list';
import footerSchema from '@schemas/footer/footer.schema';
import navItemSchema from '@schemas/navItem/navItem.schema';
import navSocialSchema from '@schemas/navSocial/navSocial.schema';
import keywordSchema from '@schemas/keyword/keyword.schema';
import linkSchema from '@schemas/link/link.schema';
import newsLetterSchema from '@schemas/newsletter/newsletter.schema';
import nodeSchema from '@schemas/node/node.schema';
import pageSchema from '@schemas/page/page.schema';
import redirectSchema from '@schemas/redirect/redirect.schema';
import settingsSchema from '@schemas/settings/settings.schema';
import imageCustomSchema from '@schemas/imageCustom/imageCustom.schema';
import quoteSchema from '@schemas/quote/quote.schema';
import linkItemSchema from '@schemas/linkItem/linkItem.schema';
import faqItemSchema from '@schemas/faqItem/faqItem.schema';
import externalLinkSchema from '@schemas/externalLink/externalLink.schema';
import itemSchema from '@schemas/item/item.schema';
import listItemSchema from '@schemas/listItem/listItem.schema';
import cardListItemSchema from '@schemas/cardListItem/cardListItem.schema';
import ctaButtonItemSchema from '@schemas/ctaButtonItem/ctaButtonItem.schema';
import cardItemSchema from '@schemas/cardItem/cardItem.schema';
import faqGroupItemSchema from '@schemas/faqGroupItem/faqGroupItem.schema';
import authorSchema from '@schemas/author/author.schema';
import navbarHierarchyItemSchema from '@schemas/navbarHierarchyItem/navbarHierarchyItem.schema';
import headerSchema from '@schemas/header/header.schema';
import contactDetailsSchema from '@schemas/contactDetails/contactDetails.schema';
import amountItemSchema from '@schemas/amountItem/amountItem.schema';
import headerItemSchema from '@schemas/headerItem/headerItem.schema';
import footerItemSchema from '@schemas/footerItem/footerItem.schema';
import richTextItemsSchema from '@schemas/richTextItems/richTextItems.schema';
import videoObjectSchema from '@schemas/videoObject/videoObject.schema';
import richTextContentSchema from '@schemas/richTextItems/richTextContent.schema';
import richTextCtaButtonSchema from '@schemas/richTextCtaButton/richTextCtaButton.schema';
import testimonialSchema from '@schemas/testimonial/testimonial.schema';
import titleWithKeywordsItemSchema from '@schemas/titleWithKeywordsItem/titleWithKeywordsItem.schema';
import expertiseSchema from '@schemas/expertise/expertise.schema';
import caseSchema from '@schemas/case/case.schema';
import sectorSchema from '@schemas/sector/sector.schema';
import bulletPointSchema from '@schemas/bulletPoint/bulletPoint.schema';


// Schemas added here, is so Sanity recongizes the schema
// The order of the array items is reflected in the order of the schemas in the Sanity Studio
export const schemas = [
  // hierarchyTree,
  settingsSchema,
  headerSchema,
  headerItemSchema,
  footerItemSchema,
  footerSchema,
  navItemSchema,
  navSocialSchema,
  contactDetailsSchema,
  newsLetterSchema,
  authorSchema,
  pageSchema,
  nodeSchema,
  redirectSchema,
  quoteSchema,
  externalLinkSchema,
  linkSchema,
  imageCustomSchema,
  linkItemSchema,
  itemSchema,
  listItemSchema,
  cardListItemSchema,
  cardItemSchema,
  ctaButtonItemSchema,
  faqItemSchema,
  faqGroupItemSchema,
  navbarHierarchyItemSchema,
  videoObjectSchema,
  keywordSchema,
  amountItemSchema,
  richTextItemsSchema,
  richTextContentSchema,
  richTextCtaButtonSchema,
  testimonialSchema,
  expertiseSchema,
  caseSchema,
  sectorSchema,
  titleWithKeywordsItemSchema,
  bulletPointSchema,

  // ------------BLOCKS------------------

];
