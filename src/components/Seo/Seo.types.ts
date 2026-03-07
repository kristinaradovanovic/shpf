import { NodeTypeIntersection } from '@lib/types/types';
import { Settings } from '@schemas/settings/settings.types';

export interface SeoProps {
  node: NodeTypeIntersection;
  settings: Settings;
}
