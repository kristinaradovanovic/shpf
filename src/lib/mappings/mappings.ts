import HomeHeroBlock from '@/components/Blocks/HomeHeroBlock/HomeHeroBlock';
import MembersCtaBlock from '@/components/Blocks/MembersCtaBlock/MembersCtaBlock';
import PartnersCtaBlock from '@/components/Blocks/PartnersCtaBlock/PartnersCtaBlock';
import SplitContentWithCtaBlock from '@/components/Blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock';
import HomeHeroBlockSchema from '@/schemas/blocks/HomeHeroBlock/HomeHeroBlock.schema';
import MembersCtaBlockSchema from '@/schemas/blocks/MembersCtaBlock/MembersCtaBlock.schema';
import PartnersCtaBlockSchema from '@/schemas/blocks/PartnersCtaBlock/PartnersCtaBlock.schema';
import SplitContentWithCtaBlockSchema from '@/schemas/blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';

export const blockComponentMapping = {
  [HomeHeroBlockSchema.name]: HomeHeroBlock,
  [SplitContentWithCtaBlockSchema.name]: SplitContentWithCtaBlock,
  [MembersCtaBlockSchema.name]: MembersCtaBlock,
  [PartnersCtaBlockSchema.name]: PartnersCtaBlock,
};
