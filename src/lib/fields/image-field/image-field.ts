import { FieldDefinition } from 'sanity';
import { ImageAltFieldCustomComponent } from './ImageAltFieldCustomComponent';

const imageFieldName = 'image';
const imageAltFieldName = 'alt';

export function imageField(options?: {
  image?: {
    imageFieldName?: string;
    imageTitle?: string;
    imageDescription?: string;
    required?: boolean;
  };
  alt?: {
    imageAltFieldName?: string;
    altTitle?: string;
    altDescription?: string;
    altPlaceholder?: string;
    required?: boolean;
  };
  group?: string[];
  fieldset?: string;
}): FieldDefinition {
  const imageField: FieldDefinition = {
    name: options?.image?.imageFieldName || imageFieldName,
    title: options?.image?.imageTitle || 'Image',
    description: options?.image?.imageDescription || 'Image for the content',
    type: 'image',
    fields: [
      {
        name: options?.alt?.imageAltFieldName || imageAltFieldName,
        type: 'string',
        title: options?.alt?.altTitle || 'Alternative text',
        description: options?.alt?.altDescription || 'Important for SEO and accessibility.',
        placeholder: options?.alt?.altPlaceholder || 'This image shows...',
        components: {
          input: (props: any) => {
            const newProps = {
              ...props,
              imageFieldName: options?.image?.imageFieldName || imageFieldName,
              imageAltFieldName: options?.alt?.imageAltFieldName || imageAltFieldName,
            };
            return ImageAltFieldCustomComponent(newProps);
          },
        },
        ...(options?.alt?.required === false
          ? {}
          : {
              validation: (rule) =>
                rule.custom((value, context) => {
                  const imageFieldValue =
                    context?.document?.[options?.image?.imageFieldName || imageFieldName];
                  if (!value && imageFieldValue) {
                    return 'Alt text is required.';
                  }
                  return true;
                }),
            }),
      },
    ],
    ...(options?.group ? { group: options.group } : {}),
    ...(options?.fieldset ? { fieldset: options.fieldset } : {}),
    options: { hotspot: true },
    ...(options?.image?.required ? { validation: (rule) => rule.required() } : {}),
  };

  return imageField;
}
