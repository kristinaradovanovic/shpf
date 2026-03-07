import { getClient } from '@lib/sanity/sanity.client';
import { groq } from 'next-sanity';
import { Button, Flex, useToast } from '@sanity/ui';
import { ctaLinkFields } from '@lib/queries/queries';
import { CtaLinkType } from '@lib/types/types';
import { extractLinkOrSlug } from '@lib/utils/link-utils';
import { useFormValue } from 'sanity';
import QRCode from 'qrcode';
import { useState } from 'react';
import Image from 'next/image';

export function ComputedFullUrlComponent(props: any) {
  // Client uses "raw" perspective to get the current block in the draft document we are editing
  const client = getClient(undefined, 'raw');
  // Ensure that we do not fetch drafts
  const pageQuery = groq`*[_id == $docId]{${ctaLinkFields}}[0]`;
  // Document id
  const docId = useFormValue(['_id']) as string | undefined;
  // State to keep track of the fetched data
  const fieldToPatch = 'node.computedFullUrl';
  const toast = useToast();
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  return (
    <div>
      {imgSrc && (
        <Image
          src={imgSrc || ''}
          width={100}
          height={100}
          alt="QR Code"
          style={{ width: '100px', height: '100px', marginBottom: '10px' }}
          onError={(e) => {
            console.error('Error loading QR Code image:', e);
            setImgSrc(null); // Reset the image source on error
          }}
        />
      )}
      <Flex
        direction={'column'}
        gap={[2, 2, 2]}
      >
        <div style={{ width: '100%' }}>{props.renderDefault(props)}</div>
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
              if (!docId) {
                console.error('Document ID is undefined');
                return;
              }
              try {
                const data = await client.fetch(pageQuery, {
                  docId: docId,
                });
                if (!data) {
                  console.error('No data found for the given document ID:', docId);
                  return;
                }
                const url = extractLinkOrSlug(data as CtaLinkType);
                if (!url) {
                  console.error('No URL found in the fetched data:', data);
                  return;
                }
                const BASE_URL = process.env.NEXT_PUBLIC_URL ?? '';
                const SANITIZED_URL = url.startsWith('/') ? url : `/${url}`;
                const fullUrl = BASE_URL ? `${BASE_URL}${SANITIZED_URL}` : SANITIZED_URL;
                QRCode.toDataURL(fullUrl)
                  .then((computedUrl) => {
                    console.log('Computed QR Code URL:', computedUrl);
                    // url is data base 64 encoded
                    setImgSrc(computedUrl);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                await client
                  .patch(docId)
                  .set({ [fieldToPatch]: fullUrl })
                  .commit();
                toast.push({
                  status: 'info',
                  closable: true,
                  title: 'Computed the full URL',
                  description: fullUrl,
                });
              } catch (error) {
                console.error(
                  'Error fetching data when attempting to patch field with computed data:',
                  error,
                );
              }
            }}
          >
            Compute
          </Button>
          <Button
            mode="ghost"
            type="button"
            fontSize={[2, 2, 2]}
            padding={[2, 2, 2]}
            onClick={async () => {
              try {
                const data = await client.fetch(pageQuery, {
                  docId: docId,
                });
                if (!data) {
                  console.error('No data found for the given document ID:', docId);
                  return;
                }
                const url = extractLinkOrSlug(data as CtaLinkType);
                if (!url) {
                  console.error('No URL found in the fetched data:', data);
                  return;
                }
                const BASE_URL = process.env.NEXT_PUBLIC_URL ?? '';
                const SANITIZED_URL = url.startsWith('/') ? url : `/${url}`;
                const fullUrl = BASE_URL ? `${BASE_URL}${SANITIZED_URL}` : SANITIZED_URL;
                navigator.clipboard.writeText(fullUrl);
                toast.push({
                  status: 'info',
                  closable: true,
                  title: 'Copied to clipboard',
                  description: fullUrl,
                });
              } catch (error) {
                console.error(
                  'Error fetching data when attempting to copy data to clipboard:',
                  error,
                );
              }
            }}
          >
            Copy
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
