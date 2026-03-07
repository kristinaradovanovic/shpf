import { getClient } from '@lib/sanity/sanity.client';
import { Button, Flex, useToast } from '@sanity/ui';
import { groq } from 'next-sanity';
import { useFormValue } from 'sanity';

export function ImageAltFieldCustomComponent(
  props: any & { imageFieldName?: string; imageAltFieldName?: string },
) {
  const toast = useToast();
  // Get document ID to be used for queries
  const docId = useFormValue(['_id']) as string | undefined;
  // Client uses "raw" perspective to get the current block in the draft document we are editing
  const client = getClient(undefined, 'raw');

  const imageField = props?.imageFieldName || 'image';
  const imageFieldAssetReference = 'asset._ref';
  const imageFieldAssetDotNotation = `${imageField}.${imageFieldAssetReference}`;
  const imageAltField = props?.imageAltFieldName || 'alt';
  const imageObjectAltField = 'altText';
  const imageFieldDotNotation = `${imageField}.${imageAltField}`;
  const imageRefQuery = groq`*[_id == $docId][0]{ "imageRef": ${[imageFieldAssetDotNotation]} }`;
  const imageObjectAltQuery = groq`*[_id == $imageRef][0]{ ${[imageObjectAltField]} }`;
  const imageAltAndRefQuery = groq`*[_id == $docId][0]{ "imageAlt": ${[imageFieldDotNotation]}, "imageRef": ${[imageFieldAssetDotNotation]} }`;

  return (
    <div>
      <Flex
        direction={'column'}
        gap={[2, 2, 2]}
      >
        {props.renderDefault(props)}
        <Flex
          direction={'row'}
          gap={[2, 2, 2]}
        >
          <Button
            mode="ghost"
            type="button"
            fontSize={[2, 2, 2]}
            padding={[2, 2, 2]}
            onClick={async () => {
              // Check if the id is defined
              if (typeof docId !== 'string') {
                console.error('Document ID is not a string:', docId);
                return;
              }

              const data = (await client.fetch(imageRefQuery, { docId })) as {
                imageRef: string;
              };
              if (!data?.imageRef) {
                console.error('Image reference not found in document:', docId);
                return;
              }
              const imageRef = data.imageRef;
              const imageData = (await client.fetch(imageObjectAltQuery, { imageRef })) as {
                altText: string;
              };
              if (!imageData?.altText) {
                console.error('Image alt text not found in document:', imageRef);
                toast.push({
                  status: 'error',
                  closable: true,
                  title: 'Image in media library has no alt text',
                  description: `No alt text found for image`,
                });
                return;
              }
              const altText = imageData.altText;
              // Patch the document with the alt text
              await client
                .patch(docId)
                .set({
                  [imageFieldDotNotation]: altText,
                })
                .commit();

              toast.push({
                status: 'info',
                closable: true,
                title: 'Fetched alt text',
                description: altText,
              });
            }}
          >
            Retrieve alt
          </Button>
          <Button
            mode="ghost"
            type="button"
            tone="primary"
            fontSize={[2, 2, 2]}
            padding={[2, 2, 2]}
            onClick={async () => {
              if (typeof docId !== 'string') {
                console.error('Document ID is not a string:', docId);
                return;
              }
              const data = (await client.fetch(imageAltAndRefQuery, { docId })) as {
                imageAlt: string;
                imageRef: string;
              };
              if (!data?.imageAlt) {
                console.error('Image alt text not found in document:', docId);
                return;
              }
              if (!data?.imageRef) {
                console.error('Image reference not found in document:', docId);
                return;
              }
              const imageAlt = data.imageAlt;
              const imageRef = data.imageRef;

              const imageObjectData = (await client.fetch(imageObjectAltQuery, { imageRef })) as {
                altText: string;
              };

              // If there already is an alt text, do not allow to update it
              if (imageObjectData?.altText) {
                toast.push({
                  status: 'error',
                  closable: true,
                  title: 'Image already has alt text',
                  description: imageObjectData.altText,
                });
                return;
              }

              // Update the image object with the alt text
              await client
                .patch(imageRef)
                .set({
                  [imageObjectAltField]: imageAlt,
                })
                .commit();
              toast.push({
                status: 'info',
                closable: true,
                title: 'Updated image alt text',
                description: imageAlt,
              });
            }}
          >
            Update alt
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
