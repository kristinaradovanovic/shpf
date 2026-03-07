# Kruso Sanity Boilerplate

## Deploy

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

## Setup

1. Create a `.env.local` file in the root of the project (get it from someone). See `.env.local.example` for reference.
2. You must be added to the github (obviously), sanity, and optionally the respective figma file and internal trello
3. **JSX-related:**
   - In `components/` is where we put JSX components.
   - Blocks go in `components/blocks/`.
   - Shared components go in `components/shared/`.
   - Shared styles, types, utils, etc. go in their respective folders in `lib/`
4. **Schema-related:**
   - In `schemas/` is where we put Sanity schemas. Blocks go in `schemas/blocks/`
   - In `lib/mappings/mappings.ts` is where we put the mapping between Sanity schemas and React components
   - In `lib/sanity/sanity.schemas.ts` is where we put the Sanity schemas so Sanity recognizes them
   - In `schemas/page/page.schema.ts` and `schemas/post/post.schema.ts` is where we have to import the respective block schemas, and then add them to the array field `blocks`, so the page and/or post schema can use them in the `blocks` field
   - In `schemas/node/node.queries.ts` is where we import the respective block queries, and then add them to `blockQueries`, so that we dereference the block data in the query when we fetch pages/posts.

## Overview

### Development environments

- When running `npm run dev`, we start the **development server** for the frontend and the CMS.
- The prod site is hosted via vercel, and is accessible at the **prod url** (ask your fellow dev)
- To access the frontend site, you must go to either the production or development URL, e.g. `http://localhost:3000`.
- To access the CMS, you must go to the go to either the production or development URL, e.g. `http://localhost:3000/studio`.
- To access the query explorer, you must go to either the production or development URL, e.g. `http://localhost:3000/studio/vision`.

> [!NOTE]
> The free plan of Sanity only supports 1 dataset (aka database), so the dev and prod environments share the same dataset. This means that if you create a page in the dev environment, it will also be visible in the prod environment. This is not ideal, but it is what it is. Sanity gives a warning if it doesn't recognize a given schema, but doesn't affect the CMS or the frontend.

### Conventions

- We use `slugToPath` to pass the `slugParent` and `slug` to get the correct path for the page/post.
- We use `<Section>`, `<Grid>`, `<GridItem>` in JSX components
- All assets, such as images, videos, files, will have a `.asset.url` field that is used to fetch the asset from Sanity.
- Use consistent casing and naming

### Routing

- We have an optional catch all `pages/[[...slug]].tsx`
- The slug file fetches the relevant data, and renders an `Seo.tsx` component for settings meta data in the head, a `Header.tsx`, an `IndexPage.tsx` which is fed all the blocks and a `Footer.tsx`.

### Base schemas

- We have the main schemas `page` and `post`, that we use to create pages and posts in the Sanity Studio.
- They have their own specific fields, but both consist of a `node` field, that contains all the data about the page title, slug, slugParent... etc
- Both `page` and `post` have a `blocks` field, which is an array of references to the block schemas that we use to build the page/post (modular blocks).

### Object schemas (references)

- We have referencable schemas aka "objects" such as `individual`, `individualCategory`, `company`, `companyCategory`, `postTag`, `postCategory`, `keyword. These are all used as references rather than raw data, to make the CMS more scalable and maintable.

### Singleton schemas (settings + navbar hierarchy)

- We have a navbar hierarchy document that decouples the navbar hierarchy from the actual underlying hiererachy between nodes (pages and posts).
- We configure the footer in the document `settings`

> [!WARNING]
> The package `@sanity/hierarchical-document-list` is deprecated and will not be maintained anymore. It has also been patched using `patch-package` to fix a critical bug when rendering the studio. When running `npm i` the package is auto-applied, and must be so for the studio to work properly.
> The file `node_modules/@sanity/hierarchical-document-list/src/components/TreeEditor.tsx` must have context={window} on the DndProvider component to prevent the error `Error: Cannot have two HTML5 backends at the same time.` from happening. This occurs because of the sanity plugin [hierarchical-document-list](https://github.com/sanity-io/hierarchical-document-list) which uses react-dnd has a bug. Also, the plugin is officially deprecated and will not be maintained anymore.

Social Media Icons by: Icons8

[vercel-deploy]: https://vercel.com/new
