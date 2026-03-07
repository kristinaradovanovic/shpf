import { dataset, projectId } from '@lib/sanity/sanity.api';
import createImageUrlBuilder from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any, quality: number) =>
  imageBuilder.image(source).quality(quality).format('webp').fit('max');
