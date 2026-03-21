import {
  sectionTaglineContainer,
  sectionTaglineText,
} from '@components/shared/elements/SectionTagline/SectionTagline.css';
import { SectionTaglineProps } from '@components/shared/elements/SectionTagline/SectionTagline.types';

export const SectionTagline = ({ text, id }: SectionTaglineProps) => {
  const generatedId =
    id ||
    `section-${text
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')}`;

  return (
    <div
      className={sectionTaglineContainer}
      id={generatedId}
    >
      <p className={sectionTaglineText}>{text}</p>
    </div>
  );
};
