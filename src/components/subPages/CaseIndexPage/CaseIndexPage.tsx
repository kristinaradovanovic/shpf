import { BlockType } from '@lib/types/types';
import { blockComponentMapping } from '@lib/mappings/mappings';
import { IndexPageProps } from '@components/subPages/IndexPage/IndexPage.types';

export default function CaseIndexPage({ node }: IndexPageProps) {
  // Ensure node has blocks property before accessing
  const blocks = node && 'blocks' in node ? (node as { blocks: BlockType[] }).blocks : undefined;
  if (!blocks) return null;

  const blockComponents = blocks?.map((block: BlockType) => {
    const BlockComponent = blockComponentMapping[
      block._type as keyof typeof blockComponentMapping
    ] as React.ElementType;
    if (!BlockComponent) return null;

    return (
      <BlockComponent
        key={block._key}
        {...block}
      />
    );
  });

  return (
    <>
      <div id="case-index-page">{blockComponents}</div>
    </>
  );
}
