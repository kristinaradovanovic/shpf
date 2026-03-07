/**
 * This code is responsible for revalidating the cache when a post or individual is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: _type == "post" || _type == "individual" || _type == "settings"
 * 7. Projection: Leave empty
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet)
 * 14. Save the configuration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import type { IncomingMessage } from 'node:http';
import { getClient } from '@lib/sanity/sanity.client';
import { groq } from 'next-sanity';
import { ctaLinkFields } from '@lib/queries/queries';
import { CtaLinkType } from '@lib/types/types';
import { extractLinkOrSlug } from '@lib/utils/link-utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Simplest naive revalidate path approach
 * 1. Get path that has been updated from the webhook payload
 * 2. Revalidate that path
 * 3. Also get all references to the current document _id
 * 4. Revalidate all those paths as well
 * 5. Done!
 */

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks).toString('utf8');
}

async function parseBody<T>(
  req: NextApiRequest,
  secret: string,
): Promise<{ isValidSignature: boolean; body: T }> {
  // Ensure we have a signature header
  console.log('headers:', req.headers);
  console.log('signature header name:', SIGNATURE_HEADER_NAME);

  if (!req.headers) {
    console.error('No headers found in the request');
    throw new Error('No headers found in the request');
  }

  let signature: string | null = null;
  try {
    signature = req.headers[SIGNATURE_HEADER_NAME] as string | null;
  } catch (error) {
    console.error('Failed to get signature header:', error);
    throw new Error('Failed to get signature header');
  }

  if (!signature) {
    console.error('Missing signature header');
    throw new Error('Missing signature header');
  }

  // Read the request body
  let body: string;
  try {
    body = await readBody(req);
  } catch (error) {
    console.error('Failed to read request body:', error);
    throw new Error('Failed to read request body');
  }

  // Validate the signature
  let isValidSignatureResponse: boolean;
  try {
    isValidSignatureResponse = await isValidSignature(body, signature, secret);
  } catch (error) {
    console.error('Failed to validate signature:', error);
    throw new Error('Failed to validate signature');
  }

  if (!isValidSignatureResponse) {
    return { isValidSignature: false, body: {} as T };
  }

  // Parse the JSON body
  let jsonBody: T;

  try {
    jsonBody = JSON.parse(body) as T;
  } catch (error) {
    console.error('Failed to parse JSON body:', error);
    throw new Error('Failed to parse JSON body');
  }

  if (!jsonBody) {
    console.error('Parsed body is empty');
    throw new Error('Parsed body is empty');
  }

  // Return the parsed body and the validity of the signature
  return {
    isValidSignature: true,
    body: jsonBody as T,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return res.status(500).json({
        message: 'SANITY_REVALIDATE_SECRET is not set in the environment variables.',
      });
    }

    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ message: 'Method not allowed, only POST requests are accepted.' });
    }

    /**
     * Note: Also waits for Content Lake eventual consistency so you can run your queries without worrying about getting stale data.
     */
    const { isValidSignature, body } = await parseBody<{
      _id: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    console.log('Revalidate request received:', body);

    // Ensure the signature is valid
    if (!isValidSignature) {
      return res.status(500).json({
        message: 'Invalid signature',
        isValidSignature,
        body,
      });
    }

    // Ensure the body contains a valid _id
    if (!body._id) {
      return res.status(500).json({
        message: 'No _id provided in the request body',
        isValidSignature,
        body,
      });
    }
    /**
     * ---=---=---=---=---=---=---=---=---=---=---=---=---
     * Revalidate the node provided in the webhook payload.
     * ---=---=---=---=---=---=---=---=---=---=---=---=---
     */
    // Fetch the node based on the _id provided in the request body and it's references
    const client = getClient();

    let fetchedNode: (CtaLinkType & { references: CtaLinkType[] }) | null = null;

    try {
      fetchedNode = await client.fetch(
        groq`*[_id == $id][0] { ${ctaLinkFields},
          "references": *[defined(node) && _id != ^._id && references(^._id)] {
            ${ctaLinkFields}
          }
        }`,
        { id: body._id },
      );
    } catch (err) {
      const error = new Error('Failed to fetch node', { cause: err });
      console.error('Failed to fetch node:', error);
      return res.status(500).json({
        message: 'Failed to fetch node',
        error: error.message,
      });
    }

    // Extract the full path for each node
    const pathsToRevalidate: string[] = [];

    // Get the full path for the main node
    const fullPathToMainNode = extractLinkOrSlug(fetchedNode as CtaLinkType);

    console.log('Full path to main node:', fullPathToMainNode);

    // Home should return "/", and not a empty string
    if (!fullPathToMainNode) {
      console.warn('No valid path found for the main node:', fetchedNode?._id);
    } else {
      pathsToRevalidate.push(fullPathToMainNode);

      const splitFullPathToMainNode = fullPathToMainNode.split('/');
      // If there are more than 2 entries, the slugParent should be pushed to be revalidated as well
      if (splitFullPathToMainNode.length > 1) {
        // Select the parent slug by removing the last segment
        const slugParent = splitFullPathToMainNode.slice(0, -1).join('/');
        console.log('Full path to slugParent:', slugParent);
        pathsToRevalidate.push(slugParent);
      }
    }

    // Get the full paths for each reference node
    if (fetchedNode?.references?.length && fetchedNode.references.length > 0) {
      for (const reference of fetchedNode?.references) {
        const fullPathToReference = extractLinkOrSlug(reference as CtaLinkType);

        console.log('Full path to reference:', fullPathToReference);
        if (fullPathToReference) {
          pathsToRevalidate.push(fullPathToReference);
        } else {
          console.warn('No valid path found for reference:', reference._id);
        }
      }
    }

    pathsToRevalidate.forEach((path) => {
      console.log('Revalidating path:', path);
      // Uncomment this line to actually revalidate the path
      const pathToRevalidate = path.startsWith('/') ? path : `/${path}`;
      console.log('Adjusted path to revalidate:', pathToRevalidate);
      res.revalidate(pathToRevalidate);
    });

    return res.json({ body, message: 'Revalidation successful' });
  } catch (err) {
    const error = new Error('An error occurred while revalidating the path', { cause: err });
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while revalidating the path',
      error: error.message,
      cause: error.cause,
    });
  }
}
