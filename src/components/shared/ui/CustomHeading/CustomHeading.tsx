import { highlightText } from './CustomHeading.css';
import { CustomHeadingProps } from './CustomHeading.types';

export const CustomHeading: React.FC<CustomHeadingProps> = ({
  text,
  as = 'h2',
  className,
  ...otherProps
}) => {
  const Element = as;

  function formatHighlightedText(text: string): (string | JSX.Element)[] {
    // Match and split the text at **...**
    const highlight = /\*\*(.*?)\*\*/;

    return text.split(highlight)?.map((part, index) =>
      index % 2 === 1 ? (
        <span
          key={`${part}-${index}`}
          className={highlightText}
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  }

  return (
    <Element
      className={className}
      {...otherProps}
    >
      {formatHighlightedText(text)}
    </Element>
  );
};
