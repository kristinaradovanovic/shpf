import { fileAssetFields } from '@lib/queries/queries';
import { footerItemSchemaFields } from '@schemas/footerItem/footerItem.queries';
import { navItemSchemaFields } from '@schemas/navItem/navItem.queries';
import { groq } from 'next-sanity';

export const footerSchemaFields = groq`
    ...,
    image {
        ${fileAssetFields}
      },
    policies {
      ${navItemSchemaFields}
    },
    footerItems[] {
      ${footerItemSchemaFields}
    }
`;
