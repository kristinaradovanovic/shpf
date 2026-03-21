import HomeHeroBlock from '@/components/Blocks/HomeHeroBlock/HomeHeroBlock';
import MembersCtaBlock from '@/components/Blocks/MembersCtaBlock/MembersCtaBlock';
import SplitContentWithCtaBlock from '@/components/Blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock';
import HomeHeroBlockSchema from '@/schemas/blocks/HomeHeroBlock/HomeHeroBlock.schema';
import SplitContentWithCtaBlockSchema from '@/schemas/blocks/SplitContentWithCtaBlock/SplitContentWithCtaBlock.schema';

export const blockComponentMapping = {
  [HomeHeroBlockSchema.name]: HomeHeroBlock,
  [SplitContentWithCtaBlockSchema.name]: SplitContentWithCtaBlock,
  [MembersCtaBlock.name]: MembersCtaBlock,
};
