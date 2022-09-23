import { ApiBasicCategory } from './IBasicCategory';
import { ICatAttribute } from './ICatAttribute';
import { ICatSettings } from './ICatSettings';

export interface ICategory {
  id: string;
  name: string;
  full_name: string;
  path_from_root: ApiBasicCategory[];
  children_categories?: ApiBasicCategory[];
  picture: string | null;
  settings: ICatSettings;
  attributes: ICatAttribute[];
  description_web: string | null;
}

export interface AttributesOblg {
  groups: Group[];
}

export interface Group {
  id: string;
  label: string;
  relevance: number;
  ui_config: any;
  components: any;
}
