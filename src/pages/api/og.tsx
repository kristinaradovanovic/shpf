// import { height, OpenGraphImage, width } from '@components/Seo/OpenGraphImage';
// import { apiVersion, dataset, projectId } from '@lib/sanity/sanity.api';
// import { ImageResponse } from '@vercel/og';
// import type { NextRequest } from 'next/server';
// import type { PageConfig } from 'next/types';
// import { createClient } from 'next-sanity';
// import { Settings } from '@schemas/settings/settings.types';
// import { getSettingsQuery } from '@schemas/settings/settings.queries';

// export const config: PageConfig = { runtime: 'edge' };

// export default async function og(req: NextRequest) {
//   const font = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then((response) =>
//     response.arrayBuffer(),
//   );
//   const { searchParams } = new URL(req.url);

//   let title = searchParams.get('title');
//   if (!title) {
//     const client = createClient({
//       projectId,
//       dataset,
//       apiVersion,
//       useCdn: false,
//     });
//     const settings = (await client.fetch<Settings>(getSettingsQuery)) || {};
//     // title = settings?.ogImage?.title as string;
//     title = '';
//   }

//   return new ImageResponse(<OpenGraphImage title={title} />, {
//     width,
//     height,
//     fonts: [
//       {
//         name: 'Inter',
//         data: await font,
//         style: 'normal',
//         weight: 700,
//       },
//     ],
//   });
// }
