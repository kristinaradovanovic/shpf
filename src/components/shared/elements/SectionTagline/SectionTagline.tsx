import {
  sectionTaglineContainer,
  sectionTaglineText,
} from '@components/shared/elements/SectionTagline/SectionTagline.css';
import { SectionTaglineProps } from '@components/shared/elements/SectionTagline/SectionTagline.types';

export const SectionTagline = ({ text, id, alignment = 'center' }: SectionTaglineProps) => {
  const generatedId =
    id ||
    `section-${text
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')}`;

  return (
    <div
      className={sectionTaglineContainer[alignment]}
      id={generatedId}
    >
      <p className={sectionTaglineText[alignment]}>{text}</p>
    </div>
  );
};
