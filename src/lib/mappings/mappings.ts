import HomeHeroBlock from '@/components/Blocks/HomeHeroBlock/HomeHeroBlock';
import MembersCtaBlock from '@/components/Blocks/MembersCtaBlock/MembersCtaBlock';
import MembershipCtaBlock from '@/components/Blocks/MembershipCtaBlock/MembershipCtaBlock';
import PartnersCtaBlock from '@/components/Blocks/PartnersCtaBlock/PartnersCtaBlock';
import RichTextBlock from '@/components/Blocks/RichTextBlock/RichTextBlock';
import SplitContentBlock from '@/components/Blocks/SplitContentBlock/SplitContentBlock';
import SplitContentWithCtaBlock from '@/components/Blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock';
import ImageBlock from '@/components/Blocks/ImageBlock/ImageBlock';
import TitleAndDescriptionBlock from '@/components/Blocks/TitleAndDescriptionBlock/TitleAndDescriptionBlock';
import HomeHeroBlockSchema from '@/schemas/blocks/HomeHeroBlock/HomeHeroBlock.schema';
import MembersCtaBlockSchema from '@/schemas/blocks/MembersCtaBlock/MembersCtaBlock.schema';
import MembershipCtaBlockSchema from '@/schemas/blocks/MembershipCtaBlock/MembershipCtaBlock.schema';
import PartnersCtaBlockSchema from '@/schemas/blocks/PartnersCtaBlock/PartnersCtaBlock.schema';
import RichTextBlockSchema from '@/schemas/blocks/RichTextBlock/RichTextBlock.schema';
import SplitContentBlockSchema from '@/schemas/blocks/SplitContentBlock/SplitContentBlock.schema';
import SplitContentWithCtaBlockSchema from '@/schemas/blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';
import ImageBlockSchema from '@/schemas/blocks/ImageBlock/ImageBlock.schema';
import TitleAndDescriptionBlockSchema from '@/schemas/blocks/TitleAndDescriptionBlock/TitleAndDescriptionBlock.schema';

export const blockComponentMapping = {
  [HomeHeroBlockSchema.name]: HomeHeroBlock,
  [SplitContentWithCtaBlockSchema.name]: SplitContentWithCtaBlock,
  [MembersCtaBlockSchema.name]: MembersCtaBlock,
  [PartnersCtaBlockSchema.name]: PartnersCtaBlock,
  [MembershipCtaBlockSchema.name]: MembershipCtaBlock,
  [RichTextBlockSchema.name]: RichTextBlock,
  [ImageBlockSchema.name]: ImageBlock,
  [SplitContentBlockSchema.name]: SplitContentBlock,
  [TitleAndDescriptionBlockSchema.name]: TitleAndDescriptionBlock,
};
