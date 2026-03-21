import { highlightText, textColorVariants } from './CustomHeading.css';
import { CustomHeadingProps } from './CustomHeading.types';

export const CustomHeading: React.FC<CustomHeadingProps> = ({
  text,
  as = 'h2',
  textColor = 'white',
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
        <span
          key={`${part}-${index}`}
          className={textColorVariants[textColor]}
        >
          {part}
        </span>
      ),
    );
  }

  return (
    <Element
      className={className}
      {...otherProps}
      style={{ color: 'inherit', ...otherProps.style }}
    >
      {formatHighlightedText(text)}
    </Element>
  );
};
