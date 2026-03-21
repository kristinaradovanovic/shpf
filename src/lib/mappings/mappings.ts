import HomeHeroBlock from '@/components/Blocks/HomeHeroBlock/HomeHeroBlock';
import HomeHeroBlockSchema from '@/schemas/blocks/HomeHeroBlock/HomeHeroBlock.schema';

export const blockComponentMapping = {
  [HomeHeroBlockSchema.name]: HomeHeroBlock,
};
