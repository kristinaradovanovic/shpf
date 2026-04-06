import { HighlightCardSchemaType } from '@/schemas/highlightCard/highlightCard.types';
import Image from 'next/image';
import { urlForImage } from '@lib/sanity/sanity.image';
import React from 'react';
import {
  cardStyle,
  cardVariantStyle,
  descriptionStyle,
  iconStyle,
  iconWrapperStyle,
  titleStyle,
} from './HighlightCard.css';

const HighlightCard = ({ title, description, icon, colorVariant }: HighlightCardSchemaType) => {
  const imageUrl = icon?.asset ? urlForImage(icon.asset, 75).url() : null;
  const variant = colorVariant ?? 'White';

  return (
    <article className={`${cardStyle} ${cardVariantStyle[variant] ?? cardVariantStyle.White}`}>
      <div className={iconWrapperStyle}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={icon?.alt ?? title ?? 'Highlight card icon'}
            fill
            className={iconStyle}
            sizes="56px"
          />
        )}
      </div>
      {title && <h4 className={titleStyle}>{title}</h4>}
      {description && (
        <p className={descriptionStyle[variant] ?? descriptionStyle.White}>{description}</p>
      )}
    </article>
  );
};

export default HighlightCard;
